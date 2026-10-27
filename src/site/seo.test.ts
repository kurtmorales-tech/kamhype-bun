import { describe, expect, test } from "bun:test";
import { renderRoute } from "./pages.ts";
import { configuredSiteBase, indexedRoutes, pageUrl, robotsText, sitemapXml } from "./seo.ts";

function withSiteUrl(url: string | undefined, run: () => void): void {
  const previous = process.env.SITE_URL;
  try {
    if (url === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = url;
    run();
  } finally {
    if (previous === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previous;
  }
}

describe("search discovery metadata", () => {
  test("without a confirmed public origin, no absolute search URLs are invented", () => {
    withSiteUrl(undefined, () => {
      expect(configuredSiteBase()).toBeNull();
      expect(sitemapXml()).toBeNull();
      expect(robotsText()).toBe("User-agent: *\nAllow: /\n");
      const html = renderRoute("/").html;
      expect(html).not.toContain('rel="canonical"');
      expect(html).not.toContain('property="og:url"');
      expect(html).toContain('name="twitter:card" content="summary"');
      expect(html).toContain('type="application/ld+json"');
    });
  });

  test("a confirmed origin gives every real page a unique canonical and sitemap entry", () => {
    withSiteUrl("https://example.org/kamhype-bun/", () => {
      expect(configuredSiteBase()).toBe("https://example.org/kamhype-bun");
      const sitemap = sitemapXml()!;
      for (const route of indexedRoutes) {
        const canonical = pageUrl(route)!;
        const html = renderRoute(route).html;
        expect(sitemap).toContain(`<loc>${canonical}</loc>`);
        expect(html).toContain(`<link rel="canonical" href="${canonical}">`);
        expect(html).toContain(`<meta property="og:url" content="${canonical}">`);
        expect(html).toContain('name="twitter:card" content="summary_large_image"');
        expect(html).toContain('property="og:image" content="https://example.org/kamhype-bun/social-card.png"');
        expect(html).toContain('href="/site.webmanifest"');
      }
      expect(sitemap.match(/<url>/g)?.length).toBe(5);
      expect(sitemap).not.toContain("404");
      expect(robotsText()).toContain("Sitemap: https://example.org/kamhype-bun/sitemap.xml");
      const notFound = renderRoute("/missing").html;
      expect(notFound).toContain('name="robots" content="noindex"');
      expect(notFound).not.toContain('rel="canonical"');
      expect(notFound).not.toContain('type="application/ld+json"');
    });
  });

  test("unsafe or malformed origin values fail rather than generating incorrect URLs", () => {
    for (const value of ["not a URL", "http://example.org", "https://user:pass@example.org", "https://example.org/?q=1", "https://example.org/#frag"]) {
      withSiteUrl(value, () => expect(configuredSiteBase).toThrow());
    }
  });
});
