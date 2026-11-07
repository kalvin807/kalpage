import {
  cleanAddress,
  isMapHost,
  maybeParseRomanizedAddress,
  parseInput,
  type LatLng,
  type ParsedInput,
} from './input';

type Fetch = typeof fetch;

export interface Place {
  readonly point: LatLng;
  readonly label?: string;
}

export interface ResolveDeps {
  readonly fetchFn: Fetch;
  readonly googleApiKey?: string;
}

// Undocumented endpoint behind japanmapcode.com. DENSO does not publish the MAPCODE algorithm,
// and the API only allows CORS from its own site, so it has to be called server-side.
const MAPCODE_API = 'https://api.japanmapcode.com/mapcode';
const GSI_API = 'https://msearch.gsi.go.jp/address-search/AddressSearch';
const GOOGLE_GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
// Static JSON per postal code built from Japan Post data (github.com/ttskch/jp-postal-code-api):
// answers in kanji, which is what GSI needs, and has no rate limit to trip.
const POSTAL_CODE_API = 'https://jp-postal-code-api.ttskch.com/api/v1';
const MAX_REDIRECTS = 5;

const APPLE_LAT_PATTERN = /<meta property="place:location:latitude" content="(-?\d+(?:\.\d+)?)"/;
const APPLE_LNG_PATTERN = /<meta property="place:location:longitude" content="(-?\d+(?:\.\d+)?)"/;
const APPLE_TITLE_PATTERN = /<meta property="og:title" content="([^"]*)"/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function describe(body: unknown): string {
  return JSON.stringify(body).slice(0, 300);
}

/** `undefined` means the API has no mapcode for this point (e.g. open sea). */
export function maybeParseMapcodeResponse(body: unknown): string | undefined {
  if (!isRecord(body)) {
    throw new Error(`Unexpected mapcode response: ${describe(body)}`);
  }
  if (body.success === true && isRecord(body.data) && typeof body.data.mapcode === 'string') {
    return body.data.mapcode;
  }
  if (body.success === false && isRecord(body.error) && body.error.code === 'NOT_FOUND') {
    return undefined;
  }
  throw new Error(`Mapcode API error: ${describe(body)}`);
}

/** GSI returns GeoJSON-ish features ordered by match quality, with `[lng, lat]` coordinates. */
export function maybeParseGsiResponse(body: unknown): Place | undefined {
  if (!Array.isArray(body)) {
    throw new Error(`Unexpected GSI response: ${describe(body)}`);
  }
  const first: unknown = body[0];
  if (first == null) {
    return undefined;
  }
  if (!isRecord(first) || !isRecord(first.geometry) || !isRecord(first.properties)) {
    throw new Error(`Unexpected GSI feature: ${describe(first)}`);
  }
  const [lng, lat] = Array.isArray(first.geometry.coordinates) ? first.geometry.coordinates : [];
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error(`Unexpected GSI coordinates: ${describe(first)}`);
  }
  const label = typeof first.properties.title === 'string' ? first.properties.title : undefined;
  return { point: { lat, lng }, label };
}

export function maybeParseGoogleGeocodeResponse(body: unknown): Place | undefined {
  if (!isRecord(body)) {
    throw new Error(`Unexpected Google response: ${describe(body)}`);
  }
  if (body.status === 'ZERO_RESULTS') {
    return undefined;
  }
  const first: unknown = Array.isArray(body.results) ? body.results[0] : undefined;
  if (body.status !== 'OK' || !isRecord(first) || !isRecord(first.geometry) || !isRecord(first.geometry.location)) {
    throw new Error(`Google Geocoding error: ${describe(body)}`);
  }
  const { lat, lng } = first.geometry.location;
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error(`Unexpected Google coordinates: ${describe(first)}`);
  }
  const label = typeof first.formatted_address === 'string' ? first.formatted_address : undefined;
  return { point: { lat, lng }, label };
}

/** Joins the Japanese address parts (東京都 + 世田谷区 + 松原) of the first match. */
export function maybeParsePostalCodeResponse(body: unknown): string | undefined {
  if (!isRecord(body) || !Array.isArray(body.addresses)) {
    throw new Error(`Unexpected postal code response: ${describe(body)}`);
  }
  const first: unknown = body.addresses[0];
  if (first == null) {
    return undefined;
  }
  if (!isRecord(first) || !isRecord(first.ja)) {
    throw new Error(`Unexpected postal code address: ${describe(first)}`);
  }
  const { prefecture, address1, address2, address3, address4 } = first.ja;
  const parts = [prefecture, address1, address2, address3, address4];
  if (!parts.every((part) => typeof part === 'string')) {
    throw new Error(`Unexpected postal code address: ${describe(first)}`);
  }
  return parts.join('');
}

export function maybeParseApplePlaceHtml(html: string): Place | undefined {
  const lat = html.match(APPLE_LAT_PATTERN)?.[1];
  const lng = html.match(APPLE_LNG_PATTERN)?.[1];
  if (!lat || !lng) {
    return undefined;
  }
  return { point: { lat: Number(lat), lng: Number(lng) }, label: html.match(APPLE_TITLE_PATTERN)?.[1] };
}

// The mapcode API answers 404 with a JSON body for points without a code, so only non-JSON is fatal.
async function fetchedJson(url: URL, response: Response): Promise<unknown> {
  if (!response.headers.get('content-type')?.includes('json')) {
    throw new Error(`${url.origin} returned ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchJson(fetchFn: Fetch, url: URL): Promise<unknown> {
  return fetchedJson(url, await fetchFn(url));
}

/**
 * Follows redirects by hand so every hop is checked against the map host allowlist, and stops
 * as soon as we leave the shortener: the full map URL already has what we need, and fetching
 * the Google Maps page itself would only return a JS app.
 */
export async function resolveShortLink(start: string, fetchFn: Fetch): Promise<string> {
  let current = new URL(start);
  if (!isMapHost(current)) {
    throw new Error(`Unsupported short link ${current.href}`);
  }
  for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
    const response = await fetchFn(current, { redirect: 'manual' });
    // Only the Location header matters; release the connection instead of leaving the body unread.
    await response.body?.cancel();
    const location = response.headers.get('location');
    if (!location) {
      throw new Error(`共有リンクを開けませんでした (${response.status})`);
    }
    const next = new URL(location, current);
    if (!isMapHost(next)) {
      throw new Error(`Unsupported redirect to ${next.hostname}`);
    }
    if (parseInput(next.href).type !== 'shortLink') {
      return next.href;
    }
    current = next;
  }
  throw new Error('Too many redirects');
}

export async function maybeGetMapcode(point: LatLng, fetchFn: Fetch): Promise<string | undefined> {
  const url = new URL(MAPCODE_API);
  url.searchParams.set('lat', String(point.lat));
  url.searchParams.set('lng', String(point.lng));
  return maybeParseMapcodeResponse(await fetchJson(fetchFn, url));
}

function normalizeForMatch(text: string): string {
  return text.normalize('NFKC').replace(/\s+/g, '').replace(/ヶ/g, 'ケ');
}

/**
 * GSI never says "no match" for text it half-recognises, so its answer needs a sanity check:
 * - In many rural areas it has no lot-level data and falls back to the town centroid
 *   (長野県松本市安曇4462-52 -> 長野県松本市安曇, ~7 km off). If the query named a block but the
 *   match has no numbers or 丁目, the pin would be wrong.
 * - Place names fuzzy-match unrelated areas (東京タワー -> 北海道札幌市東区). A query without numbers
 *   must appear in the matched address, which still accepts 渋谷区 or 千駄ヶ谷.
 */
export function isPreciseGsiMatch(query: string, matchedTitle?: string): boolean {
  if (matchedTitle == null) {
    return false;
  }
  if (/\d/.test(query.normalize('NFKC'))) {
    return /[0-9０-９]|丁目/.test(matchedTitle);
  }
  return normalizeForMatch(matchedTitle).includes(normalizeForMatch(query));
}

async function maybeGeocodeGsi(text: string, fetchFn: Fetch): Promise<Place | undefined> {
  const query = cleanAddress(text);
  const url = new URL(GSI_API);
  url.searchParams.set('q', query);
  const place = maybeParseGsiResponse(await fetchJson(fetchFn, url));
  return place && isPreciseGsiMatch(query, place.label) ? place : undefined;
}

async function maybeGeocodeGoogle(text: string, apiKey: string, fetchFn: Fetch): Promise<Place | undefined> {
  const url = new URL(GOOGLE_GEOCODE_API);
  url.searchParams.set('address', text);
  url.searchParams.set('region', 'jp');
  url.searchParams.set('language', 'ja');
  url.searchParams.set('key', apiKey);
  return maybeParseGoogleGeocodeResponse(await fetchJson(fetchFn, url));
}

async function maybeGeocodeRomanized(text: string, fetchFn: Fetch): Promise<Place | undefined> {
  const address = maybeParseRomanizedAddress(text);
  if (!address) {
    return undefined;
  }
  const url = new URL(`${POSTAL_CODE_API}/${address.postalCode}.json`);
  const response = await fetchFn(url);
  // One static file per postal code, so an unknown code is a plain 404 page rather than JSON.
  if (response.status === 404) {
    return undefined;
  }
  const town = maybeParsePostalCodeResponse(await fetchedJson(url, response));
  return town ? maybeGeocodeGsi(`${town}${address.block}`, fetchFn) : undefined;
}

/**
 * GSI is free and exact for Japanese addresses but fuzzy-matches anything else (東京タワー lands in
 * Sapporo), so text that came from a Google link goes to Google first when a key is configured,
 * then to the romanised-address rebuild, which only fires on text with a postal code and chōme.
 */
async function maybeGeocode(text: string, fromGoogle: boolean, deps: ResolveDeps): Promise<Place | undefined> {
  const { fetchFn, googleApiKey } = deps;
  const google = googleApiKey ? () => maybeGeocodeGoogle(text, googleApiKey, fetchFn) : undefined;
  const romanized = () => maybeGeocodeRomanized(text, fetchFn);
  const gsi = () => maybeGeocodeGsi(text, fetchFn);
  const geocoders = fromGoogle ? [google, romanized, gsi] : [gsi, romanized, google];
  // One upstream being down (GSI has outages, Google rejects a misconfigured key) shouldn't sink the others;
  // the first failure only surfaces if no geocoder finds the place.
  let firstError: unknown;
  for (const geocode of geocoders) {
    try {
      const place = await geocode?.();
      if (place) {
        return place;
      }
    } catch (error) {
      firstError ??= error;
    }
  }
  if (firstError !== undefined) {
    throw firstError;
  }
  return undefined;
}

export async function maybeResolvePlace(input: ParsedInput, deps: ResolveDeps): Promise<Place | undefined> {
  switch (input.type) {
    case 'point':
      return { point: input.point, label: input.label };
    case 'shortLink': {
      const resolved = parseInput(await resolveShortLink(input.url, deps.fetchFn));
      return maybeResolvePlace(resolved, deps);
    }
    case 'applePlacePage': {
      const url = new URL(input.url);
      if (!isMapHost(url)) {
        throw new Error(`Unsupported Apple Maps URL ${url.href}`);
      }
      // Apple serves place pages directly; a redirect would bypass the host check above.
      const response = await deps.fetchFn(url, { redirect: 'error' });
      return maybeParseApplePlaceHtml(await response.text());
    }
    case 'query':
      return maybeGeocode(input.text, input.fromGoogle, deps);
    case 'invalid':
      throw new Error(input.error);
    case 'empty':
      return undefined;
    default: {
      const unreachable: never = input;
      throw new Error(`unreachable input: ${JSON.stringify(unreachable)}`);
    }
  }
}
