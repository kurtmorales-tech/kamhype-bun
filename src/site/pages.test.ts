import { describe, expect, test } from "bun:test";
import { actionLink, chapterPager, escapeHtml, photoFigure } from "./components.ts";
import { renderRoute } from "./pages.ts";
import { reviewedAssets } from "./asset-gallery.ts";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const routes = ["/", "/story", "/work", "/curiosity", "/now"] as const;

describe("multi-page renderer", () => {
  for (const path of routes) {
    test(`${path} renders a complete, navigable document`, () => {
      const { html, status } = renderRoute(path);
      expect(status).toBe(200);
      expect(html).toContain('<main id="content" tabindex="-1">');
      expect(html).toContain('<a class="skip-link" href="#content">');
      expect(html).toContain(`<meta name="theme-color" content="${["/", "/story", "/curiosity"].includes(path) ? "#f2f3f5" : "#101918"}">`);
      expect(html).toContain('href="/style.css"');
      expect(html).toContain('href="/pages.css"');
      expect(html.match(/<h1\b/g)?.length).toBe(1);
      expect(html.match(/aria-current="page"/g)?.length).toBe(2); // desktop + mobile
      expect(html).toContain(`<a href="${path}" aria-current="page">`);
      for (const route of routes) expect(html).toContain(`href="${route}"`);
    });
  }

  test("unknown routes have a recoverable HTML 404", () => {
    const { html, status, path } = renderRoute("/not-a-chapter");
    expect(status).toBe(404);
    expect(path).toBeNull();
    expect(html).toContain('name="robots" content="noindex"');
    expect(html).toContain('<meta name="theme-color" content="#f2f3f5">');
    expect(html).toContain('id="missing-title">A wrong<br><em>turn.</em>');
    expect(html).toContain('href="/story"');
    expect(html).not.toContain('aria-current="page"');
  });

  test("home introduces Kurt through verified geography and keeps the chapter index in order", () => {
    const { html } = renderRoute("/");
    expect(html).toContain('<h1 id="hero-heading">From Tagum City<br><span class="hero-built">to Las Vegas');
    expect(html).toContain('Kurt Anthony Morales / Kamhype');
    expect(html).toContain('<strong>Kurt Anthony Morales</strong> Known as');
    expect(html).toContain('href="/story">Explore the story');
    expect(html).toContain('<div class="chapter-index">');
    expect(html).toContain('<ol class="chapter-list" id="chapter-list" role="list">');
    expect(html).toContain('data-chapter-view="grid" aria-pressed="true" aria-controls="chapter-list"');
    expect(html).toContain('data-chapter-view="list" aria-pressed="false" aria-controls="chapter-list"');
    const index = html.slice(html.indexOf('<ol class="chapter-list"'), html.indexOf('</ol>', html.indexOf('<ol class="chapter-list"')));
    expect([...index.matchAll(/class="chapter-card" href="([^"]+)"/g)].map((match) => match[1])).toEqual(["/story", "/work", "/curiosity", "/now"]);
    expect(index).toContain('<strong>The story</strong> <span>Where it started.');
  });

  test("story crossing is anchored and dated; curiosity remains a native disclosure", () => {
    const story = renderRoute("/story").html;
    expect(story).toContain('id="crossing"');
    expect(story).toContain('id="crossing-title">MARCH<br><span>2022</span>');
    expect(story).toContain('href="#origin"');
    const curiosity = renderRoute("/curiosity").html;
    expect(curiosity.match(/<details(?: open)?>/g)?.length).toBe(4);
    expect(curiosity.match(/<details(?: open)?>\s*<summary>/g)?.length).toBe(4);
    expect(curiosity).toContain('href="#interests"');
  });

  test("visually reviewed assets are placed by subject rather than dumped into one gallery", () => {
    expect(renderRoute("/").html).toContain("portrait-casual-wide.webp");
    expect(renderRoute("/story").html).toContain("portrait-formal-wide.webp");
    expect(renderRoute("/work").html).toContain("bin-wash-cards-wide.webp");
    expect(renderRoute("/now").html).toContain("km-agency-wide.webp");
    const curiosity = renderRoute("/curiosity").html;
    expect(curiosity).toContain("cloud-infrastructure-wide.webp");
    expect(curiosity).toContain("dashboard-wide.webp");
    expect(curiosity).toContain("not professional certifications");
    expect(curiosity).toContain("not claimed business results");
    expect(renderRoute("/now").html).not.toContain("does not depict Kurt");
  });

  test("every reviewed image has intact originals and responsive, lazy-loaded derivatives", () => {
    const html = routes.map((route) => renderRoute(route).html).join("");
    expect(new Set(reviewedAssets.map((item) => item.id)).size).toBe(reviewedAssets.length);
    for (const item of reviewedAssets) {
      const files = item.file.endsWith(".svg") ? [item.file] : [item.file, `curated/${item.id}-small.webp`, `curated/${item.id}-wide.webp`];
      for (const file of files) {
        expect(existsSync(resolve(import.meta.dir, "../../public/assets", file))).toBe(true);
      }
      expect(html).toContain(item.file.endsWith(".svg") ? `/assets/${item.file}` : `/assets/curated/${item.id}-wide.webp`);
      expect(html).toContain(`width="${item.width}" height="${item.height}"`);
    }
    for (const img of html.match(/<img[^>]+\/assets\/curated\/[^>]+>/g) ?? []) {
      expect(img).toContain('srcset="');
      if (img.includes('fetchpriority="high"')) {
        expect(img).toContain('portrait-casual-wide.webp');
        expect(img).not.toContain('loading="lazy"');
      } else expect(img).toContain('loading="lazy"');
    }
  });

  test("home presents the current learning focus and honest feedback state", () => {
    const html = renderRoute("/").html;
    expect(html).toContain('href="/home.css"');
    expect(html).toContain("learning Rust and cybersecurity with local AI agents");
    expect(html).toContain('id="technology-track" tabindex="0"');
    expect(html.match(/class="technology-card"/g)?.length).toBe(6);
    expect(html).toContain('class="tools-controls" hidden');
    expect(html).toContain("No testimonials published yet");
    expect(html).not.toContain("<blockquote");
    expect(renderRoute("/story").html).not.toContain('href="/home.css"');
  });

  test("chapter pager keeps the story sequence connected", () => {
    expect(chapterPager("/story")).toContain('href="/work"');
    expect(chapterPager("/now")).toContain('href="/curiosity"');
    expect(chapterPager("/now")).toContain('href="/"');
  });
});

describe("shared HTML components", () => {
  test("escape markup in content and attributes", () => {
    expect(escapeHtml(`<img src="x" onerror='oops'>&`)).toBe("&lt;img src=&quot;x&quot; onerror=&#39;oops&#39;&gt;&amp;");
    expect(photoFigure({ src: "/assets/tagum.jpg", alt: '<oops "test">', width: 1200, height: 720, caption: "TAGUM CITY", className: "origin-image" })).toContain('alt="&lt;oops &quot;test&quot;&gt;"');
  });

  test("allow only local or HTTPS links and protect external tabs", () => {
    expect(() => actionLink("javascript:alert(1)", "unsafe")).toThrow();
    expect(() => actionLink("//bad.example", "unsafe")).toThrow();
    expect(actionLink("https://kmwebdesign.xyz", "Visit")).toContain('rel="noopener noreferrer"');
    expect(actionLink("/story", "Story")).not.toContain("target=");
  });
});
