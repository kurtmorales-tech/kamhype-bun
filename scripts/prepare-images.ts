// Optional authoring tool: Bun + ImageMagick. Never modifies source images.
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { reviewedAssets } from "../src/site/asset-gallery.ts";

const root = resolve(import.meta.dir, "../public/assets");
mkdirSync(resolve(root, "curated"), { recursive: true });
for (const item of reviewedAssets) {
  if (item.file.endsWith(".svg")) continue;
  for (const [suffix, width] of [["small", 480], ["wide", Math.min(960, item.width)]] as const) {
    const target = resolve(root, `curated/${item.id}-${suffix}.webp`);
    if (existsSync(target)) continue;
    const result = Bun.spawnSync(["magick", resolve(root, item.file), "-auto-orient", "-resize", `${width}x`, "-strip", "-quality", "84", target]);
    if (result.exitCode !== 0) throw new Error(`Preview generation failed for ${item.file}: ${result.stderr.toString()}`);
    console.log(`Created ${target}`);
  }
}
console.log("Image previews ready. Originals and existing previews were left unchanged.");
