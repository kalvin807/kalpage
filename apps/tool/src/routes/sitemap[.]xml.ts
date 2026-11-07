import { createFileRoute } from '@tanstack/react-router';
import { SITE_URL } from '@/lib/site';

const SITEMAP_PATHS = ['/', '/tool', '/tool/date'] as const;

function buildSitemap(): string {
  const urls = SITEMAP_PATHS.map((path) => `  <url>\n    <loc>${new URL(path, SITE_URL).href}</loc>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => new Response(buildSitemap(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }),
    },
  },
});
