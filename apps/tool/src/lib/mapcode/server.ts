import { createServerFn } from '@tanstack/react-start';
import { isInJapan, parseInput, type LatLng } from './input';
import { maybeGetMapcode, maybeResolvePlace } from './services';

const MAX_INPUT_LENGTH = 4000;
// Upstreams occasionally hang; fail well inside the function's time limit rather than holding it open.
const FETCH_TIMEOUT_MS = 8000;

const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });

/**
 * Resolution runs on the server for every input, not only short links: the client can't follow
 * cross-origin redirects, and re-parsing here keeps the host allowlist out of the client's hands.
 */
export const maybeLookupPlace = createServerFn({ method: 'POST' })
  .validator((data: { readonly text: string }) => {
    if (typeof data.text !== 'string' || data.text.length > MAX_INPUT_LENGTH) {
      throw new Error('Invalid input text');
    }
    return data;
  })
  .handler(({ data }) =>
    maybeResolvePlace(parseInput(data.text), {
      fetchFn: fetchWithTimeout,
      googleApiKey: process.env.GOOGLE_MAPS_API_KEY,
    }),
  );

export const maybeLookupMapcode = createServerFn({ method: 'POST' })
  .validator((data: LatLng) => {
    if (!Number.isFinite(data.lat) || !Number.isFinite(data.lng)) {
      throw new Error('Invalid coordinates');
    }
    return data;
  })
  .handler(({ data }) => (isInJapan(data) ? maybeGetMapcode(data, fetchWithTimeout) : undefined));
