import { HeadContent, Outlet, Scripts, createRootRoute, useMatches } from '@tanstack/react-router';

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    readonly lang?: string;
  }
}

const NOT_FOUND_TITLE = 'ページが見つかりません | kalvin.io';
const NOT_FOUND_DESCRIPTION =
  'お探しのページは見つかりませんでした。トップページまたはツール一覧から目的のページを探してください。';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: NOT_FOUND_TITLE },
      { name: 'description', content: NOT_FOUND_DESCRIPTION },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: Outlet,
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
});

function useDocumentLang() {
  const matches = useMatches();
  const langs = matches.flatMap((match) => match.staticData.lang ?? []);
  return langs.at(-1) ?? 'ja';
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  const lang = useDocumentLang();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <style>{`
        body { margin: 0; }
        .not-found {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
          padding: 2rem;
          background: #121212;
          color: #e6e6e6;
          font: 0.9375rem/1.65 ui-monospace, SFMono-Regular, Menlo, 'Hiragino Sans', monospace;
        }
        .not-found__code { margin: 0; font-size: 0.8rem; color: #a8a8a8; }
        .not-found h1 { margin: 0; font-size: 1.25rem; }
        .not-found p { margin: 0; max-width: 32rem; }
        .not-found__detail { color: #a8a8a8; }
        .not-found a { color: #7cb7ff; text-decoration: none; }
        .not-found a:hover { text-decoration: underline; text-underline-offset: 0.2em; }
        @media (prefers-color-scheme: light) {
          .not-found { background: #fbfbfb; color: #2e2e2e; }
          .not-found__code, .not-found__detail { color: #5c5c5c; }
          .not-found a { color: #2563eb; }
        }
      `}</style>
      <p className="not-found__code">404</p>
      <h1>ページが見つかりません</h1>
      <p className="not-found__detail" lang="en">
        Page not found
      </p>
      <p className="not-found__detail">お探しのページは存在しないか、移動された可能性があります。</p>
      <p>
        <a href="/">トップページ</a> / <a href="/tool">便利ツール集</a>
      </p>
    </main>
  );
}
