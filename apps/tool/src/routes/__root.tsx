import { HeadContent, Outlet, Scripts, createRootRoute, useMatches } from '@tanstack/react-router';

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    readonly lang?: string;
  }
}

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  }),
  component: Outlet,
  shellComponent: RootDocument,
});

function useDocumentLang() {
  const matches = useMatches();
  const langs = matches.flatMap((match) => match.staticData.lang ?? []);
  return langs.at(-1) ?? 'en';
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
