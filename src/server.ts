// Kamhype — US Journey & Career
// Bun + TypeScript server. Zero dependencies.
// Serves public/ statically, plus a small JSON API from src/data/journey.ts.

import { join, extname, normalize } from "node:path";
import { journey } from "./data/journey.ts";

const PORT = Number(process.env.PORT ?? 3000);
const PUBLIC_DIR = join(import.meta.dir, "..", "public");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

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
  const rel = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = normalize(join(PUBLIC_DIR, rel));

  // Never serve anything outside public/
  if (!filePath.startsWith(PUBLIC_DIR)) return json({ error: "Not found" }, 404);

  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    // SPA-style fallback: unknown paths get the homepage, assets get a real 404
    if (extname(pathname)) return json({ error: "Not found" }, 404);
    const index = Bun.file(join(PUBLIC_DIR, "index.html"));
    return new Response(index, {
      headers: { "content-type": MIME[".html"], ...SECURITY_HEADERS },
    });
  }

  const ext = extname(filePath).toLowerCase();
  const isAsset = ext !== ".html";
  return new Response(file, {
    headers: {
      "content-type": MIME[ext] ?? "application/octet-stream",
      "cache-control": isAsset ? "public, max-age=86400" : "public, max-age=300",
      ...SECURITY_HEADERS,
    },
  });
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/health") return json({ ok: true, runtime: "bun", version: Bun.version });
    if (url.pathname === "/api/journey") return json(journey);

    return serveStatic(url.pathname);
  },
});

console.log(`Kamhype journey site running on Bun ${Bun.version} → http://localhost:${server.port}`);
