import { describe, expect, test } from "bun:test";
import { actionLink, chapterPager, escapeHtml, photoFigure } from "./components.ts";
import { renderRoute } from "./pages.ts";

const routes = ["/", "/story", "/work", "/curiosity", "/now"] as const;

describe("multi-page renderer", () => {
  for (const path of routes) {
    test(`${path} renders a complete, navigable document`, () => {
      const { html, status } = renderRoute(path);
      expect(status).toBe(200);
      expect(html).toContain('<main id="content" tabindex="-1">');
      expect(html).toContain('<a class="skip-link" href="#content">');
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
    expect(html).toContain("THAT CHAPTER");
    expect(html).toContain('href="/story"');
    expect(html).not.toContain('aria-current="page"');
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
