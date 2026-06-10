import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// The SSR/server plugins (tanstack start, nitro) spin up vite environments that vitest
// neither needs nor shuts down cleanly; tests run against pure modules only.
const isVitest = Boolean(process.env.VITEST);

const config = defineConfig({
  resolve: {
    // vite 8 resolves tsconfig `paths` natively; replaces the vite-tsconfig-paths plugin.
    tsconfigPaths: true,
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: isVitest
    ? []
    : [
        tailwindcss(),
        tanstackStart({
          sitemap: {
            enabled: true,
            host: "https://tool.kalvin.io",
          },
        }),
        nitro(),
        viteReact(),
      ],
});

export default config;
