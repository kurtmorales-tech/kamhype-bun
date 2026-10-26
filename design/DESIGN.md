# Kamhype visual and component contract

Read [LUSION-RESEARCH.md](LUSION-RESEARCH.md), [REDESIGN-PLAN.md](REDESIGN-PLAN.md), [COMMIT-SHEET.md](COMMIT-SHEET.md), and [SYSTEM-SHEET.md](SYSTEM-SHEET.md) before changing a route. `STORYBOARD.md` is historical narrative direction; the March 2022 crossing remains the sole full-bleed story moment.

## Voice and materials
- Kurt's journey from Tagum City to Las Vegas supplies the visual logic: lit editorial field notes, physical work, a move across countries, continued learning. It is not a tech dashboard or a Lusion clone.
- Canvas `#f2f3f5`; text `#171d1a`; night `#101918`; light-on-dark `#eff1ec`; direction accent `#dcff72`. Keep the photo treatment largely neutral on gallery surfaces; the crossing may carry richer color. Accessible body contrast ≥4.5:1 and large type ≥3:1.
- DM Sans regular/medium for broad editorial headings and body; Barlow Condensed bold for selected work/crossing headlines; IBM Plex Mono only for sparse factual metadata. Do not import reference-site font files. Headings can be deliberately large in the hero, but regular prose needs comfortable line length and zoom-safe `clamp()`.
- Layout: a generous content max around 1440px, asymmetric chapter gallery and restrained hairlines. `minmax(0, 1fr)` for shrinkable tracks, no clipped text or horizontal overflow at 320px. Reserve image layout via intrinsic dimensions/aspect ratios.
- Treat the gallery as composed content, not identical cards. Use only existing **tracked** illustrative assets; do not use newly untracked assets without clarification and rights. Photo credits and not-a-portrait note remain visible.

## Shell and navigation
- `src/site/components.ts` owns shared HTML: metadata, link safeguards, skip link, desktop nav, native `<details>` mobile nav, chapter index, pager, footer and figure/hero components. `src/site/pages.ts` composes the five route bodies.
- A lit header on home may switch to dark-page treatment on chapter heroes; both must maintain visible current route and focus. Use real links for navigation and native buttons for Grid/List state. Preserve `aria-current="page"` and unbroken link destinations.
- Homepage chapter index defaults to a usable gallery with JS disabled. Only show view controls after enhancement is ready; selecting List changes layout while keeping the same links, labels and DOM order. `aria-pressed` reflects the selected state; do not create fake tabs.
- Disclosures stay native `<details>`. The 404 explains the error and gives route choices. External links stay HTTPS with `rel="noopener noreferrer"`.

## Motion and degradation
- Decorative motion only: media reveal via opacity/transform, and optionally a CSS scroll-linked directional line under `@supports ((animation-timeline: scroll()) and (animation-range: 0% 100%))`. Unsupported browsers get the legible static route; never hide content pending a JS observer or a scroll timeline.
- `prefers-reduced-motion: reduce` drops large movement, never the information. Avoid a blanket 0.01ms animation hack, `transition: all`, global scroll listeners, autoplay audio/video, and performance-heavy shader passes.
- Prioritize a real above-the-fold image through markup with `fetchpriority="high"`; lazy-load below-the-fold images, keep `width`/`height`, and do not lazy-load the hero. Avoid copying Lusion's proprietary assets or unverified visual effects.

## Content and acceptance
- Keep facts in `src/data/journey.ts` aligned with prose. No invented degrees, client list, dates, rankings, quotes or trophy counts.
- All pages must render without JS. Validate five routes + 404 at 320 / 390 / 768 / 1440px, reduced motion, focus, native menu, Grid/List, disclosures, API and health. Run Bun tests/typecheck/build plus design lint and cross-route browser checks.
- Before public deployment, confirm rights for existing repository imagery. Do not commit or push reference-site screenshot artifacts from `.firecrawl/`.
