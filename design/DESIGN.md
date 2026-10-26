# Kamhype visual contract

Read `SYSTEM-SHEET.md`, `COMMIT-SHEET.md`, and `STORYBOARD.md` before changing a route. `SYSTEM-SHEET.md` is the current route/component contract; the storyboard records the original single-page narrative.

## Visual language
- Industrial editorial, not dashboard UI. Compressed display lettering, honest photographs, hard cuts, route lines.
- One visual signature: the Tagum → Vegas cut on `/story`. Don't add a competing spectacle to the other routes.
- Hero / work / sports / now: `#101918` to `#0b1111`. Origin: daylight neutral `#edefe9`. Curiosity and close: chartreuse `#dcff72` / `#d7fb6c`. Body ink: `#17201d`.
- Fonts: Barlow Condensed 700–800 for display, DM Sans for body, IBM Plex Mono for navigation metadata. System fallbacks are included in CSS. Keep body prose at readable line lengths.
- Container `min(100% - 5.5rem, 1440px)` desktop; `100% - 2.5rem` mobile. Break at 1100 / 800 / 600 / 370px. Reserve image layout with dimensions and aspect ratios.
- Headline max scale differs by context: hero poster is intentionally larger than content headings. No gradient text, glass cards, status-row metrics, icon grids, or fake terminal panels.

## Motion and interaction
- CSS hero orbit breathes slowly when motion is permitted. Images enter once through IntersectionObserver, transform and opacity only. Site content is visible by default without JS; never gate the story behind animation.
- `prefers-reduced-motion` removes the orbit/entrance animations and smooth scrolling. Do not add a global animation-duration override.
- The shared shell in `src/site/components.ts` has absolute route links, desktop navigation with `aria-current="page"`, native `<details>` mobile navigation, skip link and footer. Curiosity uses native `<details>`. Preserve keyboard, focus outlines and touch targets. JS only closes the mobile menu and enhances off-screen imagery.

## Content rules
- Kurt's early life and grades, the March 2022 move, kinds of work, sports and curiosity are supplied as story details. Do not invent degrees, clients, quotes, trophy counts, or rankings.
- Existing images illustrate places, work and interests. They are not portraits of Kurt. Keep their source attribution in the footer; confirm redistribution rights before public deployment.
- `src/data/journey.ts` supplies structured facts to the page renderer and JSON endpoint. Keep any editorial prose in `src/site/pages.ts` factually aligned.

## Editing protocol
1. Read the system sheet and commit sheet; keep the crossing on Story as the single visual signature.
2. Change authored route markup in `src/site/pages.ts`, shared UI in `src/site/components.ts`, tokens/sections in `public/style.css`, and route components in `public/pages.css`. For factual changes, update `src/data/journey.ts` too.
3. Run `bun run test`, `bun run check`, `bun run build`, auteur's `slopscan.mjs public`, and browser checks on **every route** at 390 / 768 / 1440 plus reduced motion and no-JS.
4. Inspect screenshots on every route. When adding a control variant, edit `SYSTEM-SHEET.md` first; when changing visual grammar, update this file.
