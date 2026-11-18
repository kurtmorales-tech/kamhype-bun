import { journey } from "../data/journey.ts";
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

export function llmsText(): string | null {
  const base = configuredSiteBase();
  if (!base) return null;
  const page = (route: string): string => `${base}${route === "/" ? "/" : `${route}/`}`;
  return `# Kurt Anthony Morales (Kamhype)

> Personal site of Kurt Anthony Morales — web designer and frontend developer based in Las Vegas, Nevada. Founder of KM Web Design and part of Ravfia Strategic Operations. From Tagum City, Philippines to Las Vegas: hands-on work, web design, and a learning record across cloud, AI, and cybersecurity.

## Pages

- [Home](${page("/")}): The story so far — origin, toolbox, and the chapters of the journey.
- [The Story](${page("/story")}): Tagum City to Las Vegas, chapter by chapter.
- [Work](${page("/work")}): Hands-on work — construction, painting, events, sports, and print design.
- [Curiosity](${page("/curiosity")}): The learning record — Google Cloud course badges and interface experiments.
- [Today](${page("/now")}): Latest work and current projects.

## Elsewhere

- [KM Web Design](${journey.links.studio}): Websites for small businesses.
- [Ravfia Line Striping](${journey.links.business}): Ravfia Strategic Operations — parking lot line striping in Las Vegas, Nevada.
- [GitHub](${journey.links.github}): Projects and code by Kurt Morales.
- [Google Skills](${journey.links.skills}): Kurt Anthony Morales on Google Skills — Google Cloud and AI course record.
- [Instagram](${journey.links.instagram}): Kamhype on Instagram.
- [Facebook](${journey.links.facebook}): Kamhype on Facebook.
`;
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
