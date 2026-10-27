// Bun server: five server-rendered pages, static assets and the journey JSON API.
import { resolve, sep } from "node:path";
import { journey } from "./data/journey.ts";
import { renderRoute } from "./site/pages.ts";
import { robotsText, sitemapXml } from "./site/seo.ts";
import { downloadAssetHtml, staticContentType } from "./site/static-serving.ts";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "127.0.0.1";
const PUBLIC_DIR = resolve(import.meta.dir, "..", "public");

const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
} as const;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...SECURITY_HEADERS },
  });
}

async function serveStatic(pathname: string): Promise<Response> {
  const filePath = resolve(PUBLIC_DIR, pathname.slice(1));
  // Only assets in public/ can be served. The boundary includes the separator,
  // so a sibling directory with a "public" prefix cannot pass this check.
  if (!filePath.startsWith(`${PUBLIC_DIR}${sep}`)) return json({ error: "Not found" }, 404);
  const file = Bun.file(filePath);
  if (!(await file.exists())) return json({ error: "Not found" }, 404);

  return new Response(file, {
    headers: {
      "content-type": staticContentType(pathname),
      ...(downloadAssetHtml(pathname) ? { "content-disposition": "attachment" } : {}),
      "cache-control": pathname.startsWith("/assets/") ? "public, max-age=86400" : "public, max-age=300",
      ...SECURITY_HEADERS,
    },
  });
}

const server = Bun.serve({
  hostname: HOST,
  port: PORT,
  async fetch(req) {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD", ...SECURITY_HEADERS } });
    }

    let url: URL;
    try {
      url = new URL(req.url);
    } catch {
      return json({ error: "Invalid request URL" }, 400);
    }
    if (url.pathname === "/health") return json({ ok: true, runtime: "bun", version: Bun.version });
    if (url.pathname === "/api/journey") return json(journey);
    if (url.pathname === "/robots.txt") {
      return new Response(robotsText(), { headers: { "content-type": "text/plain; charset=utf-8", ...SECURITY_HEADERS } });
    }
    if (url.pathname === "/sitemap.xml") {
      const xml = sitemapXml();
      return xml ? new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", ...SECURITY_HEADERS } }) : json({ error: "Site URL not configured" }, 404);
    }

    if (url.pathname === "/previews" || url.pathname === "/previews/") return serveStatic("/previews/index.html");
    if (/^\/previews\/[a-z0-9-]+\.html$/.test(url.pathname)) return serveStatic(url.pathname);

    if (["/style.css", "/pages.css", "/home.css", "/main.js", "/favicon.svg", "/favicon-32.png", "/apple-touch-icon.png", "/icon-192.png", "/icon-512.png", "/social-card.png", "/site.webmanifest"].includes(url.pathname) || url.pathname.startsWith("/assets/")) {
      return serveStatic(url.pathname);
    }

    const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
    const page = renderRoute(pathname);
    return new Response(page.html, {
      status: page.status,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...SECURITY_HEADERS },
    });
  },
});

console.log(`Kamhype multi-page site running on Bun ${Bun.version} → http://${HOST}:${server.port}`);
