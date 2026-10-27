import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { reviewedAssets } from "./asset-gallery.ts";
import { escapeHtml } from "./components.ts";
import { renderRoute } from "./pages.ts";

const publicDir = resolve(import.meta.dir, "../../public");
const previewDir = join(publicDir, "previews");
const storyIds = ["tagum", "vegas", "basketball", "billiards", "painter", "construction", "designer-desk"];
const ids = [...reviewedAssets.map((item) => item.id), "km-immersive-3d", ...storyIds];
const copyright = "© Kurt Anthony Morales — KM Web Design. All rights reserved.";
const readPreview = (id: string) => readFileSync(join(previewDir, `${id}.html`), "utf8");

describe("checked-in standalone previews", () => {
  test("the index links to exactly 41 image items and one code-only design", () => {
    expect(reviewedAssets.length).toBe(34);
    expect(ids.length).toBe(42);
    const files = readdirSync(previewDir).filter((file) => file.endsWith(".html")).sort();
    expect(files).toEqual(["index.html", ...ids.map((id) => `${id}.html`)].sort());
    const titles = ["index", ...ids].map((id) => readPreview(id).match(/<title>([^<]+)<\/title>/)?.[1]);
    expect(new Set(titles).size).toBe(43);
    const index = readPreview("index");
    const links = [...index.matchAll(/href="\/previews\/([a-z0-9-]+)\.html"/g)].map((match) => match[1]);
    expect(links).toEqual(ids);
    expect((index.match(/<h3 class="card-title">/g) ?? []).length).toBe(ids.length);
    for (const section of ["Portraits", "Print designs", "Websites", "Experiments and interface studies", "Learning", "Code-only designs", "Story photos"]) {
      expect(index).toContain(`>${section}</h2>`);
    }
    expect((index.match(/fetchpriority="high"/g) ?? []).length).toBe(1);
    expect((index.match(/loading="lazy"/g) ?? []).length).toBe(ids.length - 1);
    expect(renderRoute("/now").html).toContain('href="/previews/index.html"');
    expect(renderRoute("/now").html).toContain('href="/previews/km-agency.html"');
  });

  test("every page has a self-contained, accessible shell and a real local image", () => {
    for (const id of ["index", ...ids]) {
      const html = readPreview(id);
      expect((html.match(/<style>/g) ?? []).length).toBe(1);
      expect((html.match(/<header\b/g) ?? []).length).toBe(1);
      expect((html.match(/<main\b/g) ?? []).length).toBe(1);
      expect((html.match(/<footer\b/g) ?? []).length).toBe(1);
      expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('name="viewport" content="width=device-width, initial-scale=1"');
      expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
      expect(html).toContain(copyright);
      expect(html).toContain(":focus-visible");
      expect(html).not.toMatch(/<script\b|<link\b[^>]*stylesheet|https?:\/\//i);
      for (const match of html.matchAll(/\/assets\/[a-zA-Z0-9._/-]+/g)) {
        expect(existsSync(join(publicDir, match[0]))).toBe(true);
      }
      if (id === "index") continue;
      expect(html).toContain('<h2 id="about-title">What this is</h2>');
      expect(html).toContain('href="/previews/index.html"');
      expect(html).toContain('href="/"');
      expect(html).toMatch(/<img\b[^>]*\balt="[^"]+"[^>]*\bwidth="[1-9]\d*" height="[1-9]\d*"/);
      expect(html).toContain('object-fit:contain');
    }
  });

  test("reviewed copy, ownership and exception labels stay accurate", () => {
    const index = readPreview("index");
    for (const item of reviewedAssets) {
      const preview = readPreview(item.id);
      expect(preview).toContain(`<h1>${escapeHtml(item.title)}</h1>`);
      expect(preview).toContain(`<p>${escapeHtml(item.description)}</p>`);
      expect(index).toContain(`<h3 class="card-title">${escapeHtml(item.title)}</h3>`);
    }
    for (const id of ["cloud-infrastructure", "cloud-ai", "cloud-data", "cloud-digital", "agent-adk", "enterprise-agents", "agent-fundamentals", "cloud-engineer-prep", "generative-mlops"]) {
      expect(readPreview(id)).toContain("course completion badge — coursework, not a professional certification");
    }
    expect(readPreview("cloud-engineer-prep")).toContain("not evidence of passing an exam");
    expect(readPreview("designer-desk")).toContain("An illustration, not a photograph of a real desk or office");
    expect(readPreview("designer-desk")).toContain("Illustration by Kurt Anthony Morales");
    for (const [id, credit] of [["tagum", "Property Report Philippines"], ["vegas", "Lenna for Nevada"], ["basketball", "Vieclam Philippine"], ["billiards", "Marcus Scigliano Photography"], ["painter", "Saba Manpower"], ["construction", "Go Asia Technology"]]) {
      expect(readPreview(id)).toContain(`Photo credit: ${credit}`);
    }
    expect(readPreview("ravfia-coin")).toContain("not verified facts, an endorsement or an offer");
    expect(readPreview("km-immersive-3d")).toContain('<source media="(max-width: 600px)"');
    expect(existsSync(join(publicDir, "assets/km-immersive-3d.png"))).toBe(true);
    expect(renderRoute("/now").html).not.toContain("designer-desk.jpg");
  });
});
