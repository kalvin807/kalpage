import { HeadContent, Link, Outlet, Scripts, createRootRoute, useMatches } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { GlobalErrorComponent } from "@/components/error-boundary";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "tool.kalvin.io",
      },
      {
        name: "description",
        content: "Japanese date converter and other useful tools",
      },
      {
        name: "keywords",
        content: "年号, Japanese date converter, 和暦, 西暦, era conversion, Reiwa, Heisei, Showa, date tool, 令和, 平成, 昭和",
      },
      {
        name: "author",
        content: "Kal.L",
      },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large",
      },
      {
        name: "theme-color",
        content: "#f5f4f1",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "tool.kalvin.io",
      },
      {
        property: "og:description",
        content: "Japanese date converter and other useful tools",
      },
      {
        property: "og:site_name",
        content: "tool.kalvin.io",
      },
      {
        property: "og:locale",
        content: "ja_JP",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:url",
        content: SITE_URL,
      },
      {
        name: "twitter:title",
        content: "tool.kalvin.io",
      },
      {
        name: "twitter:description",
        content: "いまは何の年を解決する",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/og-image.png`,
      },
      {
        name: "twitter:image:alt",
        content: "tool.kalvin.io - Japanese Date Converter",
      },
      {
        name: "twitter:domain",
        content: "tool.kalvin.io",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_URL,
      },
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔧</text></svg>",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "tool.kalvin.io",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          url: SITE_URL,
          description: "Japanese date converter and other useful tools",
          inLanguage: "ja",
          author: {
            "@type": "Person",
            name: "Kal.L",
            url: "https://www.kalvin.io",
          },
        }),
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
  errorComponent: GlobalErrorComponent,
});

const PAGE_TITLES: Record<string, string> = {
  "/tool/date": "和暦・西暦変換",
};

function RootComponent() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const pageTitle = currentRoute?.pathname ? PAGE_TITLES[currentRoute.pathname] : undefined;

  return (
    <div className="min-h-dvh">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <Link to="/" className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-primary">
                tool.kalvin.io
              </Link>
              {pageTitle && (
                <h1 className="mt-1 text-lg font-semibold tracking-tight">{pageTitle}</h1>
              )}
            </div>
            <ThemeToggle />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
