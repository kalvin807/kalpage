import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Fixed to production so preview deployments still point canonical URLs at kalvin.io.
  site: 'https://kalvin.io',
  adapter: vercel({ maxDuration: 60 }),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
