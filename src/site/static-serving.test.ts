import { describe, expect, test } from "bun:test";
import { downloadAssetHtml, staticContentType } from "./static-serving.ts";

describe("static response safety", () => {
  test("only generated preview pages are rendered as HTML", () => {
    expect(staticContentType("/previews/index.html")).toBe("text/html; charset=utf-8");
    expect(staticContentType("/previews/designer-desk.html")).toBe("text/html; charset=utf-8");
    expect(staticContentType("/assets/kmwebdesign.html")).toBe("application/octet-stream");
    expect(staticContentType("/previews/../assets/kmwebdesign.html")).toBe("application/octet-stream");
    expect(staticContentType("/assets/kmwebdesign-freelance/index.html")).toBe("application/octet-stream");
  });

  test("asset HTML is downloaded and known media keep their MIME types", () => {
    expect(downloadAssetHtml("/assets/kmwebdesign.html")).toBe(true);
    expect(downloadAssetHtml("/assets/kmwebdesign-freelance/index.html")).toBe(true);
    expect(downloadAssetHtml("/previews/index.html")).toBe(false);
    expect(staticContentType("/assets/curated/km-immersive-3d-wide.webp")).toBe("image/webp");
    expect(staticContentType("/pages.css")).toBe("text/css; charset=utf-8");
  });
});
