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
  /** Seven digits, no hyphen, as zipcloud expects. */
  readonly postalCode: string;
  /** Chōme, block and building numbers joined with hyphens, e.g. `2-39-9`. */
  readonly block: string;
}

// Coarse box around Japan, including Okinawa and the outlying islands. It also covers parts of
// Korea and Russia; the mapcode API answers NOT_FOUND there, this only skips obviously foreign points.
const JAPAN_BOUNDS = { minLat: 20, maxLat: 46, minLng: 122, maxLng: 154 } as const;

const LAT_LNG_PATTERN = /^\s*(-?\d{1,3}(?:\.\d+)?)\s*[,\s]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;
const URL_PATTERN = /https?:\/\/\S+/;
const POSTAL_CODE_PATTERN = /〒\s*\d{3}-?\d{4}/g;
// Google writes hyphens as U+2212 in some locales ("1 Chome−5−5").
const ROMANIZED_POSTAL_PATTERN = /〒\s*(\d{3})[-−‐]?(\d{4})|(?<!\d)(\d{3})[-−‐](\d{4})(?!\d)/;
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
  return text.replace(POSTAL_CODE_PATTERN, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Google share links from an English UI carry addresses like
 * "2-chōme-39-9 Matsubara, Setagaya City, Tokyo 156-0043", which GSI can't read. The postal code
 * names the town and the chōme/block numbers are language-neutral, so together they are enough
 * to rebuild "東京都世田谷区松原2-39-9".
 */
export function maybeParseRomanizedAddress(text: string): RomanizedAddress | undefined {
  const postal = text.match(ROMANIZED_POSTAL_PATTERN);
  const block = text.match(ROMANIZED_BLOCK_PATTERN);
  if (!postal || !block) {
    return undefined;
  }
  const postalCode = (postal[1] ?? postal[3] ?? '') + (postal[2] ?? postal[4] ?? '');
  const numbers = [block[1], block[2], block[3]].filter((part) => part != null);
  return { postalCode, block: numbers.join('-') };
}

/** Hosts we are willing to fetch from the server; anything else would turn the resolver into an open proxy. */
export function isMapHost(url: URL): boolean {
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

/** Text after `/maps/place/` or `/maps/search/`, e.g. a place name or `35.1,139.2`. */
function maybeGooglePathText(url: URL): string | undefined {
  const segments = url.pathname.split('/');
  const index = segments.findIndex((segment) => segment === 'place' || segment === 'search');
  const segment = index === -1 ? undefined : segments[index + 1];
  if (!segment || segment.startsWith('@') || segment.startsWith('data=')) {
    return undefined;
  }
  return decodeURIComponent(segment).replace(/\+/g, ' ').trim() || undefined;
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

  const center = url.pathname.match(GOOGLE_CENTER_PATTERN);
  if (center) {
    return { type: 'point', point: { lat: Number(center[1]), lng: Number(center[2]) }, label: pathText };
  }

  const text = paramText ?? pathText;
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
  const text = raw.trim();
  if (!text) {
    return { type: 'empty' };
  }
  const point = maybeParseLatLng(text);
  if (point) {
    return { type: 'point', point };
  }
  const urlText = text.match(URL_PATTERN)?.[0];
  if (urlText) {
    return parseMapUrl(new URL(urlText));
  }
  return { type: 'query', text, fromGoogle: false };
}
