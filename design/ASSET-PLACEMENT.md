# Supplied-image integration

The operator explicitly authorized use of previously unused assets after visual review. This supersedes the earlier redesign plan's restriction against referencing untracked assets. Original files remain unchanged, uncommitted and unstaged; authorization to place them locally does not establish redistribution rights.

## Content-based placement

- Home: cream-cardigan portrait, below the chapter index, introducing the personal story.
- Story: formal portrait after the March 2022 crossing; not represented as a historical photograph of that move.
- Work: four cleaning-brand pieces: vector card, bin-wash cards, cleaning cards, flyer. Promotional prices and contacts remain artwork, not current site offers.
- Curiosity: nine Google Cloud completion-badge screenshots plus nine interface/graphic studies. Completion is not professional certification; issuer records are not independently verified. Dashboard metrics are sample content, not revenue claims. Template screenshots are labelled as references.
- Today: ten website directions, grouped in a visual archive. No invented client relationship, authorship, launch status or outcome claims.

The complete mapping, dimensions, captions and alt text live in `src/site/asset-gallery.ts` (34 images).

## Deliberate exclusions

- `Screenshot_20260328_042053.png` and `km_Web_Design_home_kurtmorales.png` are exact duplicates; the related JPEG is another export of that design. The cleaner `kmwebdesign-agency.webp` represents it.
- `screenshot-2026-05-11_22-53-37.png` repeats the freelance homepage represented by `kmwebdesign-freelance.webp`.
- `thumbnail.png` repeats the dashboard already represented by `dashboard-overview.png`.
- Videos, HTML, CSS and JavaScript files are not treated as images or embedded executable content.

## Delivery and checks

33 raster originals have two metadata-stripped WebP previews each under `public/assets/curated/`, totalling about 2.1 MiB. The SVG remains vector. Run `bun scripts/prepare-images.ts` with ImageMagick installed to create missing previews; it never overwrites originals or existing previews.

All additions use intrinsic dimensions and lazy loading. Galleries preserve the complete image using `object-fit: contain`; native full-size links work without JavaScript. The original hero loading priorities remain unchanged.

13 tests, typecheck and Bun build pass. Chromium route checks pass at 320, 390, 768 and 1440px. All 34 new images decode on mobile and desktop with JavaScript disabled and reduced motion; all 32 gallery original-image links return 200. No horizontal overflow was found. Screenshots inspected locally under `/tmp/kamhype-image-integration/`.

No deployment, commit or push was performed. Originals contain artwork/contact information and remain public-path files if this checkout is deployed; review publication rights and details before publishing.
