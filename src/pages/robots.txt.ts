import type { APIRoute } from "astro";

// Served at /robots.txt. Generated as a route (rather than a static public/
// file) so the `Sitemap:` URL is derived from the configured `site` and can't
// drift. Points crawlers at the sitemap emitted by @astrojs/sitemap.
const sitemapURL = new URL("sitemap-index.xml", import.meta.env.SITE);

const body = `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
