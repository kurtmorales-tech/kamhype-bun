import { extname } from "node:path";

const mime: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".ico": "image/x-icon",
};

// Only generated, slugged preview pages may render as HTML on the Bun server.
export function staticContentType(pathname: string): string {
  if (/^\/previews\/[a-z0-9-]+\.html$/.test(pathname)) return "text/html; charset=utf-8";
  return mime[extname(pathname).toLowerCase()] ?? "application/octet-stream";
}

export function downloadAssetHtml(pathname: string): boolean {
  return pathname.startsWith("/assets/") && extname(pathname).toLowerCase() === ".html";
}
