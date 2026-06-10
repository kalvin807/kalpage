import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import type { AstroUserConfig } from "astro";

type VitePlugins = NonNullable<NonNullable<AstroUserConfig["vite"]>["plugins"]>;

const site = process.env.VERCEL
  ? process.env.VERCEL_ENV === "production"
    ? "https://kalvin.io"
    : `https://${process.env.VERCEL_URL}`
  : (process.env.SITE ?? "http://localhost:3000");
const base = process.env.BASE ?? "/";

export default defineConfig({
  site,
  base,
  output: "server",
  adapter: vercel({
    // Vercel ISR strips search params from requests, but server islands receive their
    // encrypted props via search params, so island routes must bypass the ISR cache.
    // The island response still gets CDN caching from its own s-maxage header.
    isr: {
      exclude: [/^\/_server-islands\//],
    },
    maxDuration: 60,
  }),
  vite: {
    // @tailwindcss/vite types against the workspace-hoisted vite 8 while astro bundles its own
    // vite 7. The plugin object is runtime-compatible; the cast only reconciles the two type
    // identities of `Plugin` across duplicated vite installs.
    plugins: [tailwindcss()] as unknown as VitePlugins,
  },
});
