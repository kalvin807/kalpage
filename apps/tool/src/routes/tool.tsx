import { Link, Outlet, createFileRoute, useMatches } from '@tanstack/react-router';
import { SITE_URL } from '@/lib/site';
import { GlobalErrorComponent } from '@/components/error-boundary';
import { ThemeProvider } from '@/lib/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

import toolCss from '@/styles/tool.css?url';

const TOOL_NAME = 'kalvin.io/tool';
const TOOL_DESCRIPTION = 'Japanese date converter and other useful tools';

export const Route = createFileRoute('/tool')({
  staticData: { lang: 'ja' },
  head: () => ({
    meta: [
      { title: TOOL_NAME },
      { name: 'description', content: TOOL_DESCRIPTION },
      {
        name: 'keywords',
        content:
          '年号, Japanese date converter, 和暦, 西暦, era conversion, Reiwa, Heisei, Showa, date tool, 令和, 平成, 昭和',
      },
      { name: 'author', content: 'Kal.L' },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
      { name: 'theme-color', content: '#f5f4f1' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: TOOL_NAME },
      { property: 'og:description', content: TOOL_DESCRIPTION },
      { property: 'og:site_name', content: TOOL_NAME },
      { property: 'og:locale', content: 'ja_JP' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TOOL_NAME },
      { name: 'twitter:description', content: 'いまは何の年を解決する' },
      { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
      { name: 'twitter:image:alt', content: `${TOOL_NAME} - Japanese Date Converter` },
      { name: 'twitter:domain', content: 'kalvin.io' },
    ],
    links: [
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔧</text></svg>',
      },
      { rel: 'stylesheet', href: toolCss },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: TOOL_NAME,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          url: `${SITE_URL}/tool`,
          description: TOOL_DESCRIPTION,
          inLanguage: 'ja',
          author: {
            '@type': 'Person',
            name: 'Kal.L',
            url: SITE_URL,
          },
        }),
      },
    ],
  }),
  component: ToolLayout,
  errorComponent: GlobalErrorComponent,
});

const PAGE_TITLES: Record<string, string> = {
  '/tool/date': '和暦・西暦変換',
};

function ToolLayout() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const pageTitle = currentRoute?.pathname ? PAGE_TITLES[currentRoute.pathname] : undefined;

  return (
    <ThemeProvider>
      <div className="min-h-dvh">
        <div className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
          <header className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <Link
                  to="/tool"
                  className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-primary"
                >
                  {TOOL_NAME}
                </Link>
                {pageTitle && <h1 className="mt-1 text-lg font-semibold tracking-tight">{pageTitle}</h1>}
              </div>
              <ThemeToggle />
            </div>
          </header>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
