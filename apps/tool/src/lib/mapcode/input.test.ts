import { describe, it, expect } from 'vitest';
import { cleanAddress, isInJapan, maybeParseRomanizedAddress, parseInput, type ParsedInput } from './input';

const APPLE_SHARE_LINK =
  "https://maps.apple.com/place?address=%E3%80%92225-0011%0A%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E6%A8%AA%E6%B5%9C%E5%B8%82%E9%9D%92%E8%91%89%E5%8C%BA%0A%E3%81%82%E3%81%96%E3%81%BF%E9%87%8E2%E4%B8%81%E7%9B%AE9-13&coordinate=35.567999,139.552384&name=McDonald's%20Azamino%20Ekimae-Shop&place-id=I3D6D8928196FEF02&map=transit";
// Where https://maps.app.goo.gl/ygACKbzrPNVc6PE37 redirects to (trimmed tracking params).
const GOOGLE_RESOLVED_SHARE_LINK =
  'https://maps.google.com?q=%E3%80%92151-0051+Tokyo,+Shibuya,+Sendagaya,+1+Chome%E2%88%925%E2%88%925+%E6%88%91%E5%A6%BB&ftid=0x60188d4fa5a25da3:0xccf5e4d566d2cc1c&entry=gps&g_st=ic';

describe('parseInput', () => {
  it.each<[string, string, ParsedInput]>([
    ['empty', '   ', { type: 'empty' }],
    ['lat,lng', '35.6586, 139.7454', { type: 'point', point: { lat: 35.6586, lng: 139.7454 } }],
    ['lat lng', '26.2124 127.6809', { type: 'point', point: { lat: 26.2124, lng: 127.6809 } }],
    [
      'out-of-range numbers are not coordinates',
      '135.1, 139.2',
      { type: 'query', text: '135.1, 139.2', fromGoogle: false },
    ],
    [
      'address keeps postal code for the romanised fallback',
      '〒225-0011\n神奈川県横浜市青葉区\nあざみ野2丁目9-13',
      { type: 'query', text: '〒225-0011\n神奈川県横浜市青葉区\nあざみ野2丁目9-13', fromGoogle: false },
    ],
    [
      'apple share link',
      APPLE_SHARE_LINK,
      { type: 'point', point: { lat: 35.567999, lng: 139.552384 }, label: "McDonald's Azamino Ekimae-Shop" },
    ],
    [
      'apple ll',
      'https://maps.apple.com/?ll=35.1,139.2&q=Pin',
      { type: 'point', point: { lat: 35.1, lng: 139.2 }, label: 'Pin' },
    ],
    [
      'apple coordinate wins over ll',
      'https://maps.apple.com/?ll=-17.21,-149.94&coordinate=52.49,13.42',
      { type: 'point', point: { lat: 52.49, lng: 13.42 } },
    ],
    [
      'apple place-id only',
      'https://maps.apple.com/place?place-id=I3B04EDEB21D5F86&_provider=9902',
      { type: 'applePlacePage', url: 'https://maps.apple.com/place?place-id=I3B04EDEB21D5F86&_provider=9902' },
    ],
    [
      'apple address only',
      'https://maps.apple.com/?address=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E5%8D%83%E9%A7%84%E3%83%B6%E8%B0%B71-5-5',
      { type: 'query', text: '東京都渋谷区千駄ヶ谷1-5-5', fromGoogle: false },
    ],
    [
      'apple short link',
      'https://maps.apple/p/abcDEF123',
      { type: 'shortLink', url: 'https://maps.apple/p/abcDEF123' },
    ],
    [
      'google short link inside shared text',
      '我妻 https://maps.app.goo.gl/ygACKbzrPNVc6PE37?g_st=ic',
      { type: 'shortLink', url: 'https://maps.app.goo.gl/ygACKbzrPNVc6PE37?g_st=ic' },
    ],
    ['legacy goo.gl/maps', 'https://goo.gl/maps/abc', { type: 'shortLink', url: 'https://goo.gl/maps/abc' }],
    [
      'google resolved share link without coordinates',
      GOOGLE_RESOLVED_SHARE_LINK,
      { type: 'query', text: '〒151-0051 Tokyo, Shibuya, Sendagaya, 1 Chome−5−5 我妻', fromGoogle: true },
    ],
    [
      'google place pin wins over viewport centre',
      'https://www.google.com/maps/place/Tokyo+Tower/@35.6585,139.7432,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!8m2!3d35.6586!4d139.7454!16s',
      { type: 'point', point: { lat: 35.6586, lng: 139.7454 }, label: 'Tokyo Tower' },
    ],
    [
      'google viewport centre',
      'https://www.google.com/maps/place/Tokyo+Tower/@35.6585,139.7432,17z',
      { type: 'point', point: { lat: 35.6585, lng: 139.7432 }, label: 'Tokyo Tower' },
    ],
    [
      'google q coordinates',
      'https://www.google.com/maps?q=35.6586,139.7454',
      { type: 'point', point: { lat: 35.6586, lng: 139.7454 } },
    ],
    [
      'google maps URLs api',
      'https://www.google.com/maps/search/?api=1&query=35.6586%2C139.7454',
      { type: 'point', point: { lat: 35.6586, lng: 139.7454 } },
    ],
    [
      'google search path coordinates',
      'https://www.google.co.jp/maps/search/35.6586,+139.7454',
      { type: 'point', point: { lat: 35.6586, lng: 139.7454 } },
    ],
    [
      'google place name only',
      'https://www.google.com/maps/place/%E6%9D%B1%E4%BA%AC%E3%82%BF%E3%83%AF%E3%83%BC',
      { type: 'query', text: '東京タワー', fromGoogle: true },
    ],
    [
      'google host without /maps is not a map link',
      'https://www.google.com/search?q=35.1,139.2',
      { type: 'invalid', error: 'GoogleマップとAppleマップのリンクに対応しています' },
    ],
    [
      'other hosts are rejected',
      'https://example.com/?ll=35.1,139.2',
      { type: 'invalid', error: 'GoogleマップとAppleマップのリンクに対応しています' },
    ],
    ['full-width comma from an IME', '35.6812，139.7671', { type: 'point', point: { lat: 35.6812, lng: 139.7671 } }],
    [
      'link wrapped in full-width brackets',
      '（https://maps.app.goo.gl/abc）',
      { type: 'shortLink', url: 'https://maps.app.goo.gl/abc' },
    ],
    [
      'link followed by Japanese text',
      'https://maps.app.goo.gl/abc、見てね',
      { type: 'shortLink', url: 'https://maps.app.goo.gl/abc' },
    ],
    ['unparseable link', 'http://[', { type: 'invalid', error: 'リンクを読み取れませんでした' }],
    [
      'unescaped Japanese in a google link',
      'https://www.google.com/maps/place/東京タワー/@35.6586,139.7454,17z',
      { type: 'point', point: { lat: 35.6586, lng: 139.7454 }, label: '東京タワー' },
    ],
    [
      'apple search centre is not the result',
      'https://maps.apple.com/search?query=Tokyo%20Tower&center=35.6812,139.7671',
      { type: 'query', text: 'Tokyo Tower', fromGoogle: false },
    ],
    [
      'apple search location alone',
      'https://maps.apple.com/?sll=35.6812,139.7671',
      { type: 'point', point: { lat: 35.6812, lng: 139.7671 } },
    ],
    [
      'malformed escape in a google path',
      'https://www.google.com/maps/place/100%',
      { type: 'invalid', error: 'このGoogleマップのリンクから場所を読み取れませんでした' },
    ],
    [
      'google search text wins over viewport centre',
      'https://www.google.com/maps/search/%E6%9D%B1%E4%BA%AC%E3%82%BF%E3%83%AF%E3%83%BC/@35,139,15z',
      { type: 'query', text: '東京タワー', fromGoogle: true },
    ],
    [
      'google bare viewport',
      'https://www.google.com/maps/@35.6812,139.7671,15z',
      { type: 'point', point: { lat: 35.6812, lng: 139.7671 } },
    ],
    [
      'non-default port is rejected',
      'https://maps.apple.com:6379/?place-id=x',
      { type: 'invalid', error: 'GoogleマップとAppleマップのリンクに対応しています' },
    ],
    [
      'old http apple links are fetched over https',
      'http://maps.apple.com/place?place-id=I3D6D8928196FEF02',
      { type: 'applePlacePage', url: 'https://maps.apple.com/place?place-id=I3D6D8928196FEF02' },
    ],
  ])('%s', (_name, input, expected) => {
    expect(parseInput(input)).toEqual(expected);
  });
});

describe('cleanAddress', () => {
  it.each([
    ['〒151-0051 Tokyo, Shibuya', 'Tokyo, Shibuya'],
    ['〒1510051東京都渋谷区', '東京都渋谷区'],
    ['〒150−0001 東京都渋谷区神宮前1-1-1', '東京都渋谷区神宮前1-1-1'],
    ['150-0001 東京都渋谷区神宮前1-1-1', '東京都渋谷区神宮前1-1-1'],
    ['〒１５０－０００１ 東京都渋谷区', '東京都渋谷区'],
    ['あざみ野2丁目9-13', 'あざみ野2丁目9-13'],
    ['長野県松本市安曇4462-52', '長野県松本市安曇4462-52'],
  ])('%s', (input, expected) => {
    expect(cleanAddress(input)).toBe(expected);
  });
});

describe('isInJapan', () => {
  it.each([
    [{ lat: 35.6586, lng: 139.7454 }, true],
    [{ lat: 24.3448, lng: 124.1572 }, true], // Ishigaki
    [{ lat: 25.033, lng: 121.5654 }, false], // Taipei
    [{ lat: 0, lng: 0 }, false],
  ])('%o -> %s', (point, expected) => {
    expect(isInJapan(point)).toBe(expected);
  });
});

describe('maybeParseRomanizedAddress', () => {
  it.each([
    [
      'Sun Matsubara, 2-chōme-39-9 Matsubara, Setagaya City, Tokyo 156-0043',
      { postalCode: '1560043', block: '2-39-9' },
    ],
    ['〒151-0051 Tokyo, Shibuya, Sendagaya, 1 Chome−5−5 我妻', { postalCode: '1510051', block: '1-5-5' }],
    ['〒1500002 Tokyo, Shibuya City, Shibuya, 2 Chome-21-1', { postalCode: '1500002', block: '2-21-1' }],
    ['3-chōme Nishishinjuku, Shinjuku City, Tokyo 160-0023', undefined],
    ['1-5-5 Sendagaya, Shibuya, Tokyo', undefined],
    ['東京都渋谷区千駄ヶ谷1丁目5−5', undefined],
  ])('%s', (input, expected) => {
    expect(maybeParseRomanizedAddress(input)).toEqual(expected);
  });
});
