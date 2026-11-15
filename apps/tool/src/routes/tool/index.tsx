import { createFileRoute, Link } from '@tanstack/react-router';
import { breadcrumbStructuredData, WEBSITE_ID } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const PAGE_TITLE = '便利ツール集 | kalvin.io';
const PAGE_DESCRIPTION =
  '日付と場所にまつわる日本語の便利ツール集。和暦・西暦変換とマップコード変換を無料で提供しています。';

const TOOLS = [
  {
    to: '/tool/date' as const,
    title: '和暦・西暦変換',
    titleEn: 'Japanese Date Converter',
    description: '西暦と和暦（令和・平成・昭和・大正・明治）を相互変換',
  },
  {
    to: '/tool/mapcode' as const,
    title: 'マップコード変換',
    titleEn: 'Address to Mapcode',
    description: '住所やGoogle・Appleマップの共有リンクからカーナビ用マップコードを取得',
  },
] as const;

const STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/tool#page`,
    name: '便利ツール集',
    url: `${SITE_URL}/tool`,
    description: PAGE_DESCRIPTION,
    inLanguage: 'ja',
    isPartOf: { '@id': WEBSITE_ID },
    hasPart: TOOLS.map((tool) => ({
      '@type': 'WebApplication',
      name: tool.title,
      url: new URL(tool.to, SITE_URL).href,
      description: tool.description,
      applicationCategory: 'UtilitiesApplication',
      inLanguage: 'ja',
    })),
  },
  breadcrumbStructuredData([
    { name: 'Kal.L', path: '/' },
    { name: '便利ツール集', path: '/tool' },
  ]),
];

export const Route = createFileRoute('/tool/')({
  component: ToolsIndexPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: `${SITE_URL}/tool` },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/tool` }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(STRUCTURED_DATA) }],
  }),
});

function ToolsIndexPage() {
  return (
    <>
      <h1 className="pixel-heading m-0 mb-4 text-[0.9375rem] font-semibold text-text-heading">便利ツール集</h1>
      <p className="mt-0 mb-6 text-sm text-text-muted">日付と場所にまつわる、無料の日本語ツールです。</p>

      <ul className="m-0 list-none border-t border-line p-0">
        {TOOLS.map((tool) => (
          <li key={tool.to} className="border-x border-b border-line">
            <Link
              to={tool.to}
              className="flex flex-col gap-1 px-4 py-3.5 text-text hover:bg-surface-hover hover:no-underline"
            >
              <span className="flex justify-between gap-4 text-text-heading">
                <span>
                  {tool.title}
                  <span className="text-text-muted">&nbsp;· {tool.titleEn}</span>
                </span>
                <span aria-hidden="true" className="text-link">
                  →
                </span>
              </span>
              <span className="text-sm text-text-muted">{tool.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
