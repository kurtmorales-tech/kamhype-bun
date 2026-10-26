# Kamhype — editorial gallery redesign plan

## Goal
Reframe the existing five-page Bun biography as a highly crafted, responsive editorial gallery. Take **layout hierarchy and browsing mechanics** from the [Lusion research](LUSION-RESEARCH.md), not its assets, copy, branding, claimed technology, or exact layout. The March 2022 Tagum → Las Vegas crossing remains the singular narrative focal point.

## Content and boundaries
- Keep `/`, `/story`, `/work`, `/curiosity`, `/now`, HTML 404, `/api/journey`, and `/health` working.
- Do not change biographical claims without aligning `src/data/journey.ts` and verifying the source. Existing images illustrate places and work, not Kurt; confirm redistribution rights before public deployment.
- Use only the **tracked, existing** illustrative assets. Leave any untracked additions under `public/assets/` untouched: their source and rights are not established.
- Keep Bun + TypeScript server rendering, no new runtime package, no external 3D library, no client-side router. Content and chapter navigation must work with JavaScript disabled.

## Design decisions
1. A cool-neutral **lit gallery** on home and origin, with ink navigation and very selective chartreuse direction accents; the crossing / select scenes stay dark for contrast.
2. A type-led home hero built around Kurt's real Tagum-to-Vegas journey, not a generic status panel. The original location imagery is integrated into the editorial composition, not rendered as dashboard tiles.
3. Four chapter entries presented as an asymmetric, image-backed gallery in narrative order; an optional **Grid / List** view control changes the layout but not the links. Without JS, the gallery and all links remain visible and usable and the control is hidden.
4. Inner pages share a more restrained shell but retain different chapter layouts. Story's crossing is the only full-bleed spectacle; work is material/typographic, curiosity is an accessible disclosure study, now is a calm editorial close.
5. Two motion families at most: composited, one-time media reveal and a decorative route/progress line if browser support permits. All essential content stays visible by default. Reduced motion removes directional transforms and scrolling effects while preserving state and contrast.

## Implementation lanes (one writer in the checkout at a time)
- **Agent A — shared shell and home:** `src/site/components.ts`, `public/style.css`, `public/main.js`; improve shell, hero/typography/token foundation, chapter index markup and Grid / List behavior; preserve links, semantics, route API. No edits to `src/site/pages.ts` or `public/pages.css`.
- **Agent B — composed pages and responsive route styling:** `src/site/pages.ts`, `public/pages.css`, `src/site/pages.test.ts`; align home section markup with A's components and restyle four routes and 404. No edits to Agent A's files. Begin after A completes and read A's new component contract.
- **Parent — integration and acceptance:** reconcile seams, update docs, run checks and real-browser QA, fix any residual defects with precise edits. No agent commits, pushes or deploys.

## Gates
1. Research and component contract recorded before implementation (`LUSION-RESEARCH.md`, `COMMIT-SHEET.md`, `SYSTEM-SHEET.md`, `DESIGN.md`).
2. `bun run test`, `bun run check`, `bun run build`, JavaScript syntax, `git diff --check`, and the design scan pass.
3. Every route at 320, 390, 768, 1440px: one H1, no horizontal overflow, no broken images or links, correct current navigation. 404 returns 404 with recovery links; API and health unaffected.
4. Keyboard pass: skip link, native mobile menu, Grid / List control, disclosures, focus treatment. Recheck no-JS and reduced-motion states. Grid / List toggles a layout, not content visibility.
5. View and compare settled screenshots; reject any page that is blank during reveal, low-contrast, off-brand, or a close imitation of the reference. Do not claim production performance numbers without measurement.

## Delivery
A local implementation and brief report with verified outcomes, paths and preview URL. No commit/push or public deployment unless requested separately.
