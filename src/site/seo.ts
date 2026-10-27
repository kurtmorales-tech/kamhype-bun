import type { PagePath } from "./components.ts";

// Keep the crawlable routes in one place for the static export and sitemap.
export const indexedRoutes = ["/", "/story", "/work", "/curiosity", "/now"] as const satisfies readonly PagePath[];

// SITE_URL must be the confirmed public address of this personal site. In
// particular, do not infer it from a request Host header or an unrelated CNAME.
export function configuredSiteBase(): string | null {
  const value = process.env.SITE_URL?.trim();
  if (!value) return null;
  if (/[\r\n]/.test(value)) throw new Error("SITE_URL must be an HTTPS URL without line breaks");
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SITE_URL must be a valid HTTPS URL");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("SITE_URL must be a public HTTPS URL without credentials, query or fragment");
  }
  return url.href.replace(/\/+$/, "");
}

export function siteUrl(path: string): string | null {
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Expected a root-relative site path");
  const base = configuredSiteBase();
  return base ? `${base}${path}` : null;
}

export function pageUrl(path: PagePath): string | null {
  return siteUrl(path === "/" ? "/" : `${path}/`);
}

export function robotsText(): string {
  const sitemap = siteUrl("/sitemap.xml");
  return `User-agent: *\nAllow: /\n${sitemap ? `Sitemap: ${sitemap}\n` : ""}`;
}

export function sitemapXml(): string | null {
  const base = configuredSiteBase();
  if (!base) return null;
  const entries = indexedRoutes.map((route) => {
    const loc = `${base}${route === "/" ? "/" : `${route}/`}`.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `  <url><loc>${loc}</loc></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}
