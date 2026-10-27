// Static export for GitHub Pages (or any static host).
// Renders every route with the same renderRoute() the Bun server uses,
// copies public/ alongside, and optionally rewrites root-absolute URLs
// under a base path (e.g. /kamhype-bun for a project Pages site).
// With a custom domain at the root, leave BASE_PATH empty.
//
// Usage: BASE_PATH=/kamhype-bun CNAME=example.com bun scripts/export-static.ts
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { renderRoute } from "../src/site/pages.ts";
import { journey } from "../src/data/journey.ts";

const root = resolve(import.meta.dir, "..");
const outDir = join(root, "pages-dist");
const base = (process.env.BASE_PATH ?? "").replace(/\/+$/, "");
const cname = process.env.CNAME ?? "";

const ROUTES = ["/", "/story", "/work", "/curiosity", "/now"] as const;

function rewriteUrls(html: string): string {
  if (!base) return html;
  return html
    .replaceAll('href="/', `href="${base}/`)
    .replaceAll('src="/', `src="${base}/`)
    .replaceAll('srcset="/', `srcset="${base}/`)
    .replaceAll(", /assets/", `, ${base}/assets/`)
    .replaceAll(", /style.css", `, ${base}/style.css`)
    .replaceAll(", /pages.css", `, ${base}/pages.css`)
    .replaceAll(", /home.css", `, ${base}/home.css`);
}

function rewriteCss(css: string): string {
  if (!base) return css;
  return css.replaceAll("url('/", `url('${base}/`).replaceAll('url("/', `url("${base}/`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Static assets + stylesheets/scripts from public/
cpSync(join(root, "public"), outDir, { recursive: true });
for (const file of readdirSync(outDir)) {
  if (file.endsWith(".css")) {
    const path = join(outDir, file);
    writeFileSync(path, rewriteCss(readFileSync(path, "utf8")));
  }
}

// Pages
for (const route of ROUTES) {
  const page = renderRoute(route);
  if (page.status !== 200) throw new Error(`Route ${route} rendered with status ${page.status}`);
  const dir = route === "/" ? outDir : join(outDir, route.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), rewriteUrls(page.html));
  console.log(`exported ${route} -> ${join(dir, "index.html")}`);
}

// 404 page (GitHub Pages serves 404.html for unknown paths)
const notFound = renderRoute("/does-not-exist");
writeFileSync(join(outDir, "404.html"), rewriteUrls(notFound.html));

// The journey data, as a static file (the /api/journey endpoint needs the Bun server)
mkdirSync(join(outDir, "api"), { recursive: true });
writeFileSync(join(outDir, "api", "journey.json"), JSON.stringify(journey, null, 2));

// GitHub Pages: skip Jekyll processing; set custom domain when provided
writeFileSync(join(outDir, ".nojekyll"), "");
if (cname) writeFileSync(join(outDir, "CNAME"), `${cname}\n`);

console.log(`Static export ready in pages-dist/ (base: "${base || "/"}", CNAME: "${cname || "none"}")`);
