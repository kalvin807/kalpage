// jpeg-js keeps the painting fetch free of native binaries: sharp's libvips .so does
// not survive Vercel's file tracing under Bun's isolated node_modules layout.
// Met's primaryImageSmall is always a JPEG, so a pure-JS decoder is enough.
import { decode } from 'jpeg-js';
import { STRIP_COLS, STRIP_ROWS, type PaintingInfo, type PaintingPayload, type PixelData } from './painting';

const MAX_RETRIES = 3;
const CACHE_TTL_SECONDS = 60 * 60 * 6;
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;
// v1/search was retired on 2026-10-01 (it now answers 410). v1.1/search is paginated
// with offset/limit and reports the match count as `total`.
const SEARCH_URL =
  'https://collectionapi.metmuseum.org/public/collection/v1.1/search?departmentId=11&hasImages=true&q=painting';
const OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

interface SearchPage {
  readonly total: number;
  readonly objectIDs: readonly number[];
}

async function searchPage(offset: number, limit: number): Promise<SearchPage> {
  const res = await fetch(`${SEARCH_URL}&offset=${offset}&limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Search API failed: ${res.status}`);
  }
  const data = (await res.json()) as unknown as { total?: number; objectIDs?: number[] };
  return { total: data.total ?? 0, objectIDs: data.objectIDs ?? [] };
}

/** Returns up to `count` consecutive matching object IDs starting at a random offset. */
async function randomObjectIDs(count: number): Promise<readonly number[]> {
  const { total } = await searchPage(0, 1);
  if (total === 0) {
    throw new Error('No paintings found');
  }
  const offset = Math.floor(Math.random() * Math.max(1, total - count + 1));
  return (await searchPage(offset, count)).objectIDs;
}

interface VerticalBand {
  readonly top: number;
  readonly height: number;
}

interface PaintingCache {
  readonly expiresAt: number;
  readonly payload: PaintingPayload;
}

const globalCache = globalThis as typeof globalThis & {
  paintingPixelsCache?: PaintingCache;
};

/**
 * Picks the horizontal band through the middle of the image whose aspect ratio matches the
 * strip, so cells stay square. Very wide images fall back to their full height.
 */
function centerBand(width: number, height: number): VerticalBand {
  const bandHeight = Math.min(height, Math.round((width * STRIP_ROWS) / STRIP_COLS));
  return { top: Math.floor((height - bandHeight) / 2), height: bandHeight };
}

/** Box-average downsample of an RGBA band into a cols x rows grid of RGB cells. */
function downsamplePixels(
  data: Uint8Array,
  width: number,
  band: VerticalBand,
  cols: number,
  rows: number,
): PixelData[] {
  const pixels: PixelData[] = [];
  for (let row = 0; row < rows; row++) {
    const y0 = band.top + Math.floor((row * band.height) / rows);
    const y1 = Math.max(y0 + 1, band.top + Math.floor(((row + 1) * band.height) / rows));
    for (let col = 0; col < cols; col++) {
      const x0 = Math.floor((col * width) / cols);
      const x1 = Math.max(x0 + 1, Math.floor(((col + 1) * width) / cols));
      let r = 0;
      let g = 0;
      let b = 0;
      const count = (y1 - y0) * (x1 - x0);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * width + x) * 4;
          r += data[i] ?? 0;
          g += data[i + 1] ?? 0;
          b += data[i + 2] ?? 0;
        }
      }
      pixels.push({ r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) });
    }
  }
  return pixels;
}

export async function fetchPaintingPixels(): Promise<PaintingPayload> {
  const now = Date.now();
  const cached = globalCache.paintingPixelsCache;

  try {
    if (cached && cached.expiresAt > now) {
      return cached.payload;
    }

    const objectIDs = await randomObjectIDs(MAX_RETRIES);

    let imageUrl: string | null = null;
    let info: PaintingInfo = { title: '', artist: '', date: '', url: '' };

    for (const id of objectIDs) {
      const objRes = await fetch(OBJECT_URL + id);
      if (!objRes.ok) {
        continue;
      }
      const obj = (await objRes.json()) as unknown as Record<string, unknown>;
      if (!obj.isPublicDomain || !obj.primaryImageSmall) {
        continue;
      }

      imageUrl = obj.primaryImageSmall as string;
      info = {
        title: (obj.title as string) ?? 'Untitled',
        artist: (obj.artistDisplayName as string) ?? 'Unknown',
        date: (obj.objectDate as string) ?? '',
        url: (obj.objectURL as string) ?? '',
      };
      break;
    }

    if (!imageUrl) {
      throw new Error('All retries exhausted');
    }

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      throw new Error('Image fetch failed');
    }
    const imageBuffer = Buffer.from(await imageRes.arrayBuffer());

    const { data, width, height } = decode(imageBuffer, { useTArray: true, formatAsRGBA: true });
    if (!width || !height) {
      throw new Error('Missing image dimensions');
    }

    const pixels = downsamplePixels(data, width, centerBand(width, height), STRIP_COLS, STRIP_ROWS);

    const payload: PaintingPayload = { pixels, info };
    globalCache.paintingPixelsCache = { expiresAt: now + CACHE_TTL_MS, payload };
    return payload;
  } catch (e) {
    console.error('[PaintingPixels] Failed to fetch painting:', e);
    if (cached) {
      return cached.payload;
    }
    throw e;
  }
}
