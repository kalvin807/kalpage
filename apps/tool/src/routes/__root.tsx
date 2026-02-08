import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { GlobalErrorComponent } from "@/components/error-boundary";

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
        property: "og:locale",
        content: "ja_JP",
      },
      {
        property: "og:url",
        content: SITE_URL,
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
          "@type": "WebSite",
          name: "tool.kalvin.io",
          url: SITE_URL,
          description: "Japanese date converter and other useful tools",
          inLanguage: "ja",
        }),
      },
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: GlobalErrorComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" style={{ colorScheme: "light" }}>
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
