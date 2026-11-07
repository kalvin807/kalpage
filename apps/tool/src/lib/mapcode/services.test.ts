import { describe, it, expect } from 'vitest';
import {
  isPreciseGsiMatch,
  maybeParseApplePlaceHtml,
  maybeParseGoogleGeocodeResponse,
  maybeParseGsiResponse,
  maybeParseMapcodeResponse,
  maybeParsePostalCodeResponse,
  maybeResolvePlace,
  resolveShortLink,
} from './services';

describe('maybeParseMapcodeResponse', () => {
  it.each([
    [{ success: true, data: { mapcode: '33 156 113*15' } }, '33 156 113*15'],
    [{ success: false, error: { type: 'not_found', code: 'NOT_FOUND', message: 'not found: mapcode' } }, undefined],
  ])('%o', (body, expected) => {
    expect(maybeParseMapcodeResponse(body)).toBe(expected);
  });

  it.each([[{ success: false, error: { code: 'VALIDATION_ERROR' } }], [{ success: true, data: {} }], ['<html>']])(
    'throws on %o',
    (body) => {
      expect(() => maybeParseMapcodeResponse(body)).toThrow();
    },
  );
});

describe('maybeParseGsiResponse', () => {
  it('returns the first feature with lat/lng swapped back', () => {
    const body = [
      {
        geometry: { coordinates: [139.709305, 35.67831], type: 'Point' },
        type: 'Feature',
        properties: { addressCode: '', title: '東京都渋谷区千駄ケ谷一丁目５番５号' },
      },
    ];
    expect(maybeParseGsiResponse(body)).toEqual({
      point: { lat: 35.67831, lng: 139.709305 },
      label: '東京都渋谷区千駄ケ谷一丁目５番５号',
    });
  });

  it('returns undefined for no match', () => {
    expect(maybeParseGsiResponse([])).toBeUndefined();
  });
});

describe('maybeParseGoogleGeocodeResponse', () => {
  it('returns the first result', () => {
    const body = {
      status: 'OK',
      results: [
        {
          formatted_address: '日本、〒151-0051 東京都渋谷区千駄ケ谷１丁目５−５',
          geometry: { location: { lat: 35.6783, lng: 139.7093 } },
        },
      ],
    };
    expect(maybeParseGoogleGeocodeResponse(body)).toEqual({
      point: { lat: 35.6783, lng: 139.7093 },
      label: '日本、〒151-0051 東京都渋谷区千駄ケ谷１丁目５−５',
    });
  });

  it('returns undefined for ZERO_RESULTS', () => {
    expect(maybeParseGoogleGeocodeResponse({ status: 'ZERO_RESULTS', results: [] })).toBeUndefined();
  });

  it('throws on API errors', () => {
    expect(() =>
      maybeParseGoogleGeocodeResponse({ status: 'REQUEST_DENIED', error_message: 'The provided API key is invalid.' }),
    ).toThrow(/REQUEST_DENIED/);
  });
});

const MATSUBARA_POSTAL_CODE = {
  postalCode: '1560043',
  addresses: [
    {
      prefectureCode: '13',
      ja: { prefecture: '東京都', address1: '世田谷区', address2: '松原', address3: '', address4: '' },
    },
  ],
};

describe('maybeParsePostalCodeResponse', () => {
  it('joins the Japanese address parts', () => {
    expect(maybeParsePostalCodeResponse(MATSUBARA_POSTAL_CODE)).toBe('東京都世田谷区松原');
  });

  it('returns undefined without addresses', () => {
    expect(maybeParsePostalCodeResponse({ postalCode: '1560043', addresses: [] })).toBeUndefined();
  });

  it('throws on unexpected shapes', () => {
    expect(() => maybeParsePostalCodeResponse({ results: null })).toThrow();
  });
});

describe('maybeParseApplePlaceHtml', () => {
  it('reads place meta tags', () => {
    const html = `<head><meta property="og:title" content="Reuterplatz"><meta property="place:location:latitude" content="52.4890246"><meta property="place:location:longitude" content="13.4295963"></head>`;
    expect(maybeParseApplePlaceHtml(html)).toEqual({
      point: { lat: 52.4890246, lng: 13.4295963 },
      label: 'Reuterplatz',
    });
  });

  it('returns undefined without coordinates', () => {
    expect(maybeParseApplePlaceHtml('<head></head>')).toBeUndefined();
  });
});

/** Serves canned redirects keyed by URL, so redirect handling runs without the network. */
function fakeRedirects(redirects: Record<string, string>): typeof fetch {
  return async (input) => {
    const location = redirects[String(input)];
    return new Response(null, location ? { status: 302, headers: { location } } : { status: 404 });
  };
}

describe('resolveShortLink', () => {
  it('follows short links until it reaches a full map URL', async () => {
    const fetchFn = fakeRedirects({
      'https://maps.app.goo.gl/abc': 'https://goo.gl/maps/def',
      'https://goo.gl/maps/def': 'https://maps.google.com/?q=35.1,139.2',
    });
    await expect(resolveShortLink('https://maps.app.goo.gl/abc', fetchFn)).resolves.toBe(
      'https://maps.google.com/?q=35.1,139.2',
    );
  });

  it('refuses redirects to non-map hosts', async () => {
    const fetchFn = fakeRedirects({ 'https://maps.app.goo.gl/abc': 'http://169.254.169.254/latest' });
    await expect(resolveShortLink('https://maps.app.goo.gl/abc', fetchFn)).rejects.toThrow(/Unsupported redirect/);
  });

  it('fails on dead links', async () => {
    await expect(resolveShortLink('https://maps.app.goo.gl/gone', fakeRedirects({}))).rejects.toThrow(/404/);
  });
});

describe('isPreciseGsiMatch', () => {
  it.each<[string, string | undefined, boolean]>([
    ['東京都渋谷区千駄ヶ谷1-5-5', '東京都渋谷区千駄ケ谷一丁目５番５号', true],
    ['あざみ野2丁目9-13', '神奈川県横浜市青葉区あざみ野二丁目９番', true],
    ['東京都新宿区西新宿6-8-1', '東京都新宿区西新宿六丁目', true],
    ['長野県松本市安曇4462-52', '長野県松本市安曇', false],
    ['東京都渋谷区', '東京都渋谷区', true],
    ['千駄ヶ谷', '東京都渋谷区千駄ケ谷', true],
    ['東京タワー', '北海道札幌市東区', false],
    ['長野県松本市安曇4462-52', undefined, false],
  ])('%s -> %s', (query, title, expected) => {
    expect(isPreciseGsiMatch(query, title)).toBe(expected);
  });
});

/** Answers by host, so the geocoder chain runs end to end without the network. */
function fakeHosts(responses: Record<string, () => Response>): typeof fetch {
  return async (input) => {
    const respond = responses[new URL(String(input)).hostname];
    if (!respond) {
      throw new Error(`unexpected fetch ${String(input)}`);
    }
    return respond();
  };
}

const GSI_MATSUBARA = [
  {
    geometry: { coordinates: [139.648132, 35.668777], type: 'Point' },
    type: 'Feature',
    properties: { title: '東京都世田谷区松原二丁目３９番９号' },
  },
];
const ROMANIZED_QUERY = {
  type: 'query',
  text: 'Sun Matsubara, 2-chōme-39-9 Matsubara, Setagaya City, Tokyo 156-0043',
  fromGoogle: true,
} as const;

describe('maybeResolvePlace geocoder chain', () => {
  it('moves on when an earlier geocoder fails', async () => {
    const fetchFn = fakeHosts({
      'maps.googleapis.com': () => Response.json({ status: 'REQUEST_DENIED', error_message: 'bad key' }),
      'jp-postal-code-api.ttskch.com': () => Response.json(MATSUBARA_POSTAL_CODE),
      'msearch.gsi.go.jp': () => Response.json(GSI_MATSUBARA),
    });
    await expect(maybeResolvePlace(ROMANIZED_QUERY, { fetchFn, googleApiKey: 'key' })).resolves.toEqual({
      point: { lat: 35.668777, lng: 139.648132 },
      label: '東京都世田谷区松原二丁目３９番９号',
    });
  });

  it('surfaces the first failure when nothing finds the place', async () => {
    const fetchFn = fakeHosts({
      'jp-postal-code-api.ttskch.com': () => new Response('', { status: 503, statusText: 'Service Unavailable' }),
      'msearch.gsi.go.jp': () => Response.json([]),
    });
    await expect(maybeResolvePlace(ROMANIZED_QUERY, { fetchFn })).rejects.toThrow(/503/);
  });
});
