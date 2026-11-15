import { Link, Outlet, createFileRoute, useMatches } from '@tanstack/react-router';
import { SITE_URL } from '@/lib/site';
import { GlobalErrorComponent } from '@/components/error-boundary';
import { ThemeProvider } from '@/lib/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

import avatarUrl from '@/assets/avatar.webp';

import toolCss from '@/styles/tool.css?url';

const TOOL_NAME = 'kalvin.io/tool';
const TOOL_TITLE = '便利ツール集 | kalvin.io';
const TOOL_DESCRIPTION =
  '日付と場所にまつわる日本語の便利ツール集。和暦・西暦変換とマップコード変換を無料で提供しています。';
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = 'Kal.L — kalvin.io';

export const Route = createFileRoute('/tool')({
  staticData: { lang: 'ja' },
  head: () => ({
    meta: [
      { title: TOOL_TITLE },
      { name: 'description', content: TOOL_DESCRIPTION },
      { name: 'author', content: 'Kal.L' },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
      { name: 'theme-color', content: '#121212' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE_URL}/tool` },
      { property: 'og:title', content: TOOL_TITLE },
      { property: 'og:description', content: TOOL_DESCRIPTION },
      { property: 'og:image', content: OG_IMAGE_URL },
      { property: 'og:image:secure_url', content: OG_IMAGE_URL },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },
      { property: 'og:site_name', content: TOOL_NAME },
      { property: 'og:locale', content: 'ja_JP' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TOOL_TITLE },
      { name: 'twitter:description', content: TOOL_DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE_URL },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
      { name: 'twitter:domain', content: 'kalvin.io' },
    ],
    links: [
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔧</text></svg>',
      },
      { rel: 'stylesheet', href: toolCss },
    ],
  }),
  component: ToolLayout,
  errorComponent: GlobalErrorComponent,
});

const PAGE_TITLES: Record<string, string> = {
  '/tool/date': '和暦・西暦変換',
  '/tool/mapcode': 'マップコード変換',
};

function ToolLayout() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const pathname = currentRoute?.pathname;
  const pageTitle = pathname ? PAGE_TITLES[pathname] : undefined;
  const onToolIndex = pathname === '/tool';

  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-bg focus:p-3"
      >
        本文へ移動
      </a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-5 py-3">
          <nav aria-label="パンくず" className="flex min-w-0 items-center gap-2">
            <a href="/" className="flex shrink-0 items-center gap-2.5 text-text-heading hover:no-underline">
              <img
                src={avatarUrl}
                alt=""
                width={24}
                height={24}
                loading="eager"
                className="size-6 [image-rendering:pixelated]"
              />
              kalvin.io
            </a>
            <span aria-hidden="true" className="text-text-muted">
              /
            </span>
            <Link
              to="/tool"
              aria-current={onToolIndex ? 'page' : undefined}
              className={
                onToolIndex ? 'shrink-0 text-text-heading' : 'shrink-0 text-text-muted hover:text-text-heading'
              }
            >
              tool
            </Link>
            {pageTitle && (
              <>
                <span aria-hidden="true" className="text-text-muted">
                  /
                </span>
                <span aria-current="page" className="truncate text-text-heading">
                  {pageTitle}
                </span>
              </>
            )}
          </nav>
          <div className="ml-auto shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-2xl px-5 pt-12 pb-20 sm:pt-16">
        {pageTitle && (
          <h1 className="pixel-heading m-0 mb-6 text-[0.9375rem] font-semibold text-text-heading">{pageTitle}</h1>
        )}
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
