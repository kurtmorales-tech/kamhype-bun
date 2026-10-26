# SYSTEM-SHEET — Kamhype editorial gallery

## Purpose and route map
A five-page Bun-rendered biography: a first-time visitor should understand the Tagum-to-Vegas journey and choose a chapter quickly. Shared header, footer, navigation and pager hold the system together; the Story crossing provides the single narrative climax.

- `/` — lit editorial introduction, asymmetrical gallery of four chapter links, short directional route and next-chapter close; highest traffic.
- `/story` — Tagum/upbringing/education, then the full-bleed March 2022 Tagum → Las Vegas crossing; high traffic.
- `/work` — construction, painting, events and sports in material/photo editorial rows; medium traffic.
- `/curiosity` — computers, DIY and design in native accessible disclosures; medium traffic.
- `/now` — current design work and verified outbound/contact links; high traffic.
- unknown — HTTP 404 with a way back to Home/Story.

`/api/journey` and `/health` remain Bun routes, unaffected by the visual system. `STORYBOARD.md` keeps the prior story beats as an archive; it does not mandate the former dark-everywhere layout.

## Component/control inventory and budgets

- `PageShell` (one): metadata, fonts, skip link, light/dark-aware header, nav, footer, asset links; no client routing.
- `NavLink` (one plus `aria-current` state), native `MobileMenu` (one, open/closed native details), `ActionLink` (filled or text variant, max **four** visibly distinct treatments), native `Disclosure` (one, open/closed state).
- `ChapterIndex` (one ordered sequence with **gallery/list layout states**); `IndexViewButton` (two labels sharing one visual style, selected via `aria-pressed`, only after JS enhancement). Same anchors and DOM order in both modes.
- `ChapterHero` (photo-led or type-led variant), `MediaFigure` (caption overlay or inline), `SectionRail` (inverted by page surface), `ChapterPager` (previous/next), `PhotoCredits` (one).
- New control variants require an inventory update **before** CSS. For systemscan allow `button=5,link=14` because link classification includes a one-off skip link, social/external links and pager; do not silently widen these budgets.

## State recipes

- Links: readable default, hover only under `@media (hover:hover) and (pointer:fine)`, 3px visible `:focus-visible` outline, `aria-current="page"` + visible indicator for current. Link text alone must convey destination.
- View buttons: native `<button type="button">`, visible label Grid/List, focus outline, `aria-pressed` state and short non-layout transition. Hidden if JS disabled; the gallery itself remains fully present.
- Mobile navigation: `<details><summary>` with readable open/closed cue, Escape can close as enhancement; all chapter links accessible without JS.
- Curiosity disclosures: native summary, visible open/closed cue; content is authored server-side and remains reachable without JS.
- No client data-fetching, disabled controls or empty-data states exist. Google Fonts still makes a network request; system font fallbacks must remain usable if it fails. HTML 404 is the error/recovery state. No essential content starts at opacity 0.

## Acceptance
- Maintain one H1, valid landmarks/heading hierarchy, no fake buttons, no inaccessible overlay.
- 320 / 390 / 768 / 1440: no horizontal scroll, text wrap and image crops intentional. Current route marker and focus remain visible on both dark and lit surfaces.
- No new Lusion images, licensed fonts or branded copy. Do not treat untracked files under `public/assets/` as approved assets.
- Run tests, typecheck, build, design scan, systemscan and all-route real-browser/no-JS/reduced-motion checks.

## Local verification (2026-10-26)
- Bun: 11 tests pass; typecheck, build, `node --check public/main.js`, and `git diff --check` pass. The last LSP probe had inconclusive push-only clean rechecks and one auxiliary `hardcoded-url` warning on `href.startsWith("https://")` (a scheme guard, not a hardcoded destination); do not count that probe as wholly clean.
- Chromium: all five pages and the HTML 404 checked at 320, 390, 768 and 1440px; no clipped headings, horizontal overflow, broken local anchors, failed loaded images or console errors. `/api/journey` and `/health` return JSON; unknown pages return 404.
- Keyboard skip link, native menu, Escape, Grid/List buttons, and disclosures work. Without JavaScript, four chapter links remain visible, the menu and disclosures work, and view controls stay hidden. Reduced motion removes the media entrance animation.
- Scoped design scan: zero findings in owned CSS, JS and renderer files. A full `public/` scan is blocked by an unrelated, untouched, untracked `public/assets/kmwebdesign.html`; that file and all other untracked assets were left alone.
- Rendered system scan: **14 link variants / 5 button variants**, at the predeclared budgets. It warns about the intentionally unique scroll cue and Grid/List states, plus the broad responsive type scale (44 measured steps). Treat the type-scale warning as a maintenance concern, not a clean-scan claim.
- Previously tracked illustrative images were the only assets referenced. Redistribution rights are still unverified; do not deploy publicly on the strength of this local check.
