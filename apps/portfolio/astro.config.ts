import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

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
    isr: true,
    maxDuration: 60
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
