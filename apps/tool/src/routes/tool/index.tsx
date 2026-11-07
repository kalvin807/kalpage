import { createFileRoute, Link } from '@tanstack/react-router';
import { SITE_URL } from '@/lib/site';

export const Route = createFileRoute('/tool/')({
  component: ToolsIndexPage,
  head: () => ({
    meta: [{ property: 'og:url', content: `${SITE_URL}/tool` }],
    links: [{ rel: 'canonical', href: `${SITE_URL}/tool` }],
  }),
});

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
];

function ToolsIndexPage() {
  return (
    <>
      <h1 className="pixel-heading m-0 mb-4 text-[0.9375rem] font-semibold text-text-heading">ツール集</h1>
      <p className="mt-0 mb-6 text-sm text-text-muted">Utility tools for everyday use</p>

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
