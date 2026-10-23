export interface LatLng {
  readonly lat: number;
  readonly lng: number;
}

interface EmptyInput {
  readonly type: 'empty';
}

interface PointInput {
  readonly type: 'point';
  readonly point: LatLng;
  readonly label?: string;
}

/** Share links hide the real URL behind a redirect, so they must be resolved server-side. */
interface ShortLinkInput {
  readonly type: 'shortLink';
  readonly url: string;
}

/** Apple place links with only a `place-id` carry the coordinates in the page's meta tags. */
interface ApplePlacePageInput {
  readonly type: 'applePlacePage';
  readonly url: string;
}

/** Raw text, postal code included: the romanised-address fallback needs it, GSI gets a cleaned copy. */
interface QueryInput {
  readonly type: 'query';
  readonly text: string;
  // Google share links often carry only a romanised address (`?q=…&ftid=…`), which GSI can't match.
  readonly fromGoogle: boolean;
}

interface InvalidInput {
  readonly type: 'invalid';
  readonly error: string;
}

export type ParsedInput = EmptyInput | PointInput | ShortLinkInput | ApplePlacePageInput | QueryInput | InvalidInput;

export interface RomanizedAddress {
  /** Seven ASCII digits, no hyphen: the postal code API's file name. */
  readonly postalCode: string;
  /** Chōme, block and building numbers joined with hyphens, e.g. `2-39-9`. */
  readonly block: string;
}

// Coarse box around Japan, including Okinawa and the outlying islands. It also covers parts of
// Korea and Russia; the mapcode API answers NOT_FOUND there, this only skips obviously foreign points.
const JAPAN_BOUNDS = { minLat: 20, maxLat: 46, minLng: 122, maxLng: 154 } as const;

const LAT_LNG_PATTERN = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*[,\s]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;
// ASCII only, so surrounding Japanese punctuation ("（https://…）", "https://…、見てね") isn't swallowed.
const URL_PATTERN = /https?:\/\/[\x21-\x7e]+/;
const URL_TRAILING_PUNCTUATION = /[).,!?'"]+$/;
// Matched after NFKC, which turns full-width digits and hyphens into ASCII. Google writes some
// hyphens as U+2212 ("1 Chome−5−5"), which NFKC leaves alone. Without 〒 the hyphen is required,
// so lot numbers like 4462 aren't mistaken for postal codes.
const POSTAL_CODE_SOURCE = String.raw`〒\s*(\d{3})[-−‐]?(\d{4})|(?<!\d)(\d{3})[-−‐](\d{4})(?!\d)`;
const POSTAL_CODE_PATTERN = new RegExp(POSTAL_CODE_SOURCE);
const POSTAL_CODE_GLOBAL_PATTERN = new RegExp(POSTAL_CODE_SOURCE, 'g');
const ROMANIZED_BLOCK_PATTERN = /(\d+)[\s\-−‐]*ch[oō]me[\s\-−‐]*(\d+)(?:[-−‐](\d+))?/i;
// `!3d{lat}!4d{lng}` is the selected place; `@{lat},{lng}` is only the viewport centre.
const GOOGLE_PIN_PATTERN = /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/g;
const GOOGLE_CENTER_PATTERN = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/;
const GOOGLE_HOST_PATTERN = /^(?:www\.|maps\.)?google\.(?:com|co\.jp)$/;

const GOOGLE_POINT_PARAMS = ['q', 'query', 'll', 'sll', 'daddr', 'destination', 'center'] as const;
const GOOGLE_TEXT_PARAMS = ['q', 'query', 'daddr', 'destination'] as const;
const APPLE_POINT_PARAMS = ['coordinate', 'll', 'daddr', 'destination', 'q', 'sll', 'center', 'near'] as const;
const APPLE_TEXT_PARAMS = ['address', 'q', 'name', 'daddr', 'destination'] as const;

export function isInJapan({ lat, lng }: LatLng): boolean {
  return (
    lat >= JAPAN_BOUNDS.minLat && lat <= JAPAN_BOUNDS.maxLat && lng >= JAPAN_BOUNDS.minLng && lng <= JAPAN_BOUNDS.maxLng
  );
}

function maybeParseLatLng(text: string | null): LatLng | undefined {
  const match = text?.match(LAT_LNG_PATTERN);
  if (!match) {
    return undefined;
  }
  const lat = Number(match[1]);
  const lng = Number(match[2]);
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return undefined;
  }
  return { lat, lng };
}

/** Postal codes and line breaks (Apple puts the address on several lines) both stop GSI from matching. */
export function cleanAddress(text: string): string {
  return text.normalize('NFKC').replace(POSTAL_CODE_GLOBAL_PATTERN, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Google share links from an English UI carry addresses like
 * "2-chōme-39-9 Matsubara, Setagaya City, Tokyo 156-0043", which GSI can't read. The postal code
 * names the town and the chōme/block numbers are language-neutral, so together they are enough
 * to rebuild "東京都世田谷区松原2-39-9".
 */
export function maybeParseRomanizedAddress(text: string): RomanizedAddress | undefined {
  const normalized = text.normalize('NFKC');
  const postal = normalized.match(POSTAL_CODE_PATTERN);
  const block = normalized.match(ROMANIZED_BLOCK_PATTERN);
  if (!postal || !block) {
    return undefined;
  }
  const postalCode = (postal[1] ?? postal[3] ?? '') + (postal[2] ?? postal[4] ?? '');
  const numbers = [block[1], block[2], block[3]].filter((part) => part != null);
  return { postalCode, block: numbers.join('-') };
}

/**
 * URLs we are willing to fetch from the server; anything else would turn the resolver into an
 * open proxy. HTTPS on the default port only, so `maps.apple.com:6379` can't reach other services.
 */
export function isMapHost(url: URL): boolean {
  if (url.protocol !== 'https:' || url.port !== '') {
    return false;
  }
  return isShortLink(url) || isGoogleMapsUrl(url) || isAppleMapsUrl(url);
}

function isShortLink(url: URL): boolean {
  if (url.hostname === 'maps.app.goo.gl' || url.hostname === 'maps.apple') {
    return true;
  }
  return url.hostname === 'goo.gl' && url.pathname.startsWith('/maps/');
}

function isGoogleMapsUrl(url: URL): boolean {
  if (!GOOGLE_HOST_PATTERN.test(url.hostname)) {
    return false;
  }
  return url.hostname.startsWith('maps.') || url.pathname === '/maps' || url.pathname.startsWith('/maps/');
}

function isAppleMapsUrl(url: URL): boolean {
  return url.hostname === 'maps.apple.com';
}

function maybeParamText(params: URLSearchParams, keys: ReadonlyArray<string>): string | undefined {
  for (const key of keys) {
    const value = params.get(key)?.trim();
    if (value) {
      return value;
    }
  }
  return undefined;
}

function maybeParamPoint(params: URLSearchParams, keys: ReadonlyArray<string>): LatLng | undefined {
  for (const key of keys) {
    const point = maybeParseLatLng(params.get(key));
    if (point) {
      return point;
    }
  }
  return undefined;
}

function maybeDecodeUriComponent(text: string): string | undefined {
  try {
    return decodeURIComponent(text);
  } catch {
    // Malformed escapes (`/maps/place/100%`) are bad input, not a server fault.
    return undefined;
  }
}

/** Text after `/maps/place/` or `/maps/search/`, e.g. a place name or `35.1,139.2`. */
function maybeGooglePathText(url: URL): string | undefined {
  const segments = url.pathname.split('/');
  const index = segments.findIndex((segment) => segment === 'place' || segment === 'search');
  const segment = index === -1 ? undefined : segments[index + 1];
  if (!segment || segment.startsWith('@') || segment.startsWith('data=')) {
    return undefined;
  }
  return maybeDecodeUriComponent(segment)?.replace(/\+/g, ' ').trim() || undefined;
}

function parseGoogleUrl(url: URL): ParsedInput {
  const pathText = maybeGooglePathText(url);
  const paramText = maybeParamText(url.searchParams, GOOGLE_TEXT_PARAMS);

  // Several pins can appear in `data=`; the last one is the selected place.
  const pin = [...url.href.matchAll(GOOGLE_PIN_PATTERN)].at(-1);
  if (pin) {
    return { type: 'point', point: { lat: Number(pin[1]), lng: Number(pin[2]) }, label: pathText };
  }

  const point = maybeParamPoint(url.searchParams, GOOGLE_POINT_PARAMS) ?? maybeParseLatLng(pathText ?? null);
  if (point) {
    return { type: 'point', point };
  }

  // On a place page the viewport is centred on the place; on search or directions pages it is just
  // wherever the map was, so the search text is the better signal there.
  const text = paramText ?? pathText;
  const center = url.pathname.match(GOOGLE_CENTER_PATTERN);
  if (center && (url.pathname.includes('/place/') || !text)) {
    return { type: 'point', point: { lat: Number(center[1]), lng: Number(center[2]) }, label: pathText };
  }

  if (text) {
    return { type: 'query', text, fromGoogle: true };
  }
  return { type: 'invalid', error: 'このGoogleマップのリンクから場所を読み取れませんでした' };
}

function parseAppleUrl(url: URL): ParsedInput {
  const params = url.searchParams;
  const point = maybeParamPoint(params, APPLE_POINT_PARAMS);
  if (point) {
    return { type: 'point', point, label: maybeParamText(params, ['name', 'address', 'q']) };
  }
  if (params.has('place-id') || params.has('auid')) {
    return { type: 'applePlacePage', url: url.href };
  }
  const text = maybeParamText(params, APPLE_TEXT_PARAMS);
  if (text) {
    return { type: 'query', text, fromGoogle: false };
  }
  return { type: 'invalid', error: 'このAppleマップのリンクから場所を読み取れませんでした' };
}

function parseMapUrl(url: URL): ParsedInput {
  if (url.port !== '') {
    return { type: 'invalid', error: 'GoogleマップとAppleマップのリンクに対応しています' };
  }
  // Old Apple links are plain http; anything we fetch goes over https.
  url.protocol = 'https:';
  if (isShortLink(url)) {
    return { type: 'shortLink', url: url.href };
  }
  if (isGoogleMapsUrl(url)) {
    return parseGoogleUrl(url);
  }
  if (isAppleMapsUrl(url)) {
    return parseAppleUrl(url);
  }
  return { type: 'invalid', error: 'GoogleマップとAppleマップのリンクに対応しています' };
}

/**
 * Accepts an address, `lat,lng`, or a map share link. Shared text often wraps the
 * link in a place name ("我妻 https://maps.app.goo.gl/…"), so any URL inside wins.
 */
export function parseInput(raw: string): ParsedInput {
  // NFKC so IME input like `35.6812，139.7671` or full-width digits reads like ASCII.
  const text = raw.normalize('NFKC').trim();
  if (!text) {
    return { type: 'empty' };
  }
  const point = maybeParseLatLng(text);
  if (point) {
    return { type: 'point', point };
  }
  const urlText = text.match(URL_PATTERN)?.[0].replace(URL_TRAILING_PUNCTUATION, '');
  if (urlText) {
    return URL.canParse(urlText)
      ? parseMapUrl(new URL(urlText))
      : { type: 'invalid', error: 'リンクを読み取れませんでした' };
  }
  return { type: 'query', text, fromGoogle: false };
}
