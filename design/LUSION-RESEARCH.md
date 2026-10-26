# Lusion Labs — quick design research

Source: [labs.lusion.co](https://labs.lusion.co/) · captured 2026-10-26 with Firecrawl. This is a reference, not a source of copy or assets.

![Local Firecrawl full-page capture of the Lusion Labs homepage](../.firecrawl/lusion-fullpage.png)

The screenshot above is a **local, gitignored** research artifact. If it is unavailable in another checkout, use the source URL; do not add the screenshot or the source site's assets to the published site.

## Evidence and confidence

- Observed in the three-second full-page capture (`.firecrawl/lusion-fullpage.png`): predominantly white / near-neutral background with a soft mottled texture; black compact brand block and sparse navigation; a large, relatively light-weight uppercase three-line headline; secondary copy offset to the right; generous margins and negative space. A large footer-like overlay obscures much of the gallery; only portions of mostly grayscale project imagery and small metadata are visible. The precise gallery layout cannot be verified from this capture.
- Observed in page markup (`.firecrawl/lusion-fullpage.json`): introduction, experiment cards, contact/footer, and visible GRID / LIST and B / W controls. A browser interaction attempt timed out, so the controls' resulting behavior is **not verified** here.
- Firecrawl branding (`.firecrawl/lusion-branding.json`) identifies Aeonik, white background, and black primary text; overall confidence is only ~0.46. Its suggested blue/red accent colors and 16px headline size contradict the screenshot's dominant monochrome and large type. Treat them as low-confidence extraction, not reliable design tokens.
- Motion, Grid/List behavior, exact gallery composition, responsive breakpoints, the 3D implementation, and GPU effects are **not verified** by these captures. Do not promise or copy any specific shader or animation merely because the site is known as an experimental lab.

## Transferable ideas for Kamhype

1. **Editorial scale:** large, quiet display type backed by generous space, rather than piling up digital-dashboard elements.
2. **Gallery rhythm:** one large chapter panel, smaller offsets and a concluding horizontal panel; make real chapter subjects the content, not repeated decorative cards.
3. **Measured utility:** clear navigation, small but readable chapter metadata, and a grid/list switch that offers a genuinely different browsing mode when JavaScript is present.
4. **Material contrast:** lit gallery pages against one dark, photographic Tagum → Las Vegas crossing. A limited chartreuse line retains Kamhype's identity without reproducing Lusion's brand.
5. **Performance/accessibility boundary:** no third-party logos, Aeonik files, Lusion imagery, WebGL, autoplay video or audio. All factual prose, chapter links and crossing information remain present without JavaScript and when reduced motion is requested.

## Suggested Kamhype tokens (inferred adaptation, not extracted Lusion values)

- Gallery canvas `#f2f3f5`, text `#171d1a`, soft line `rgba(23,29,26,.18)`.
- Dark story stage `#101918`, light-on-dark `#eff1ec`, existing Kamhype directional accent `#dcff72` used sparingly.
- DM Sans regular for large editorial display / readable prose, Barlow Condensed for physical work headlines, IBM Plex Mono for a few coordinates and technical labels. These are the site's existing available faces, **not** Lusion's licensed typography.
- Desktop content max ~1440px; generous 3–7rem vertical spacing; `clamp()` for display sizes and container-safe tracks for gallery items. Make mobile a real single-column composition, not a cropped desktop grid.

## Rerun inputs

- Workflow: `firecrawl-website-design-clone` (bounded homepage pass)
- Source URL: `https://labs.lusion.co/`
- Target: Bun + TypeScript server HTML / CSS / minimal progressive JS
- Local evidence: `.firecrawl/lusion-branding.json`, `.firecrawl/lusion-fullpage.json`, `.firecrawl/lusion-fullpage.png`
