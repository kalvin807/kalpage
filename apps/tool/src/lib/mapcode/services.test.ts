import { describe, it, expect } from 'vitest';
import {
  maybeParseApplePlaceHtml,
  maybeParseGoogleGeocodeResponse,
  maybeParseGsiResponse,
  maybeParseMapcodeResponse,
  maybeParseZipcloudResponse,
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

describe('maybeParseZipcloudResponse', () => {
  it('joins prefecture, city and town', () => {
    const body = {
      message: null,
      results: [{ address1: '東京都', address2: '世田谷区', address3: '松原', zipcode: '1560043' }],
      status: 200,
    };
    expect(maybeParseZipcloudResponse(body)).toBe('東京都世田谷区松原');
  });

  it('returns undefined for unknown postal codes', () => {
    expect(maybeParseZipcloudResponse({ message: null, results: null, status: 200 })).toBeUndefined();
  });

  it('throws on API errors', () => {
    expect(() =>
      maybeParseZipcloudResponse({ message: 'パラメータ「郵便番号」の桁数が不正です。', results: null, status: 400 }),
    ).toThrow(/桁数/);
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
