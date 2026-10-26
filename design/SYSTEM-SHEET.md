# SYSTEM-SHEET — Kamhype multi-page site

## Product
- **What it does:** Introduces Kurt Anthony Morales and lets visitors browse distinct chapters of his journey without reading one very long page.
- **Who uses it, how often:** Visitors and potential collaborators; typically first-time, occasionally returning for career/contact links.
- **Stack / markup:** Bun + TypeScript server-rendered HTML strings with reusable components in `src/site/components.ts`. One stylesheet and tiny progressive-enhancement script, no runtime packages.
- **Moment of care:** Each inner page has an honest previous/next chapter path, a persistent current-page navigation marker, and a useful 404 route back into the story; no client-side router or loading gate.
- **Existing signature:** The Tagum-to-Las-Vegas March 2022 visual remains on Story only. Other pages should not compete with another spectacle.

## Route map

| route | job | layout family | shared shell | traffic |
| --- | --- | --- | --- | --- |
| `/` | Introduce Kurt and choose a chapter | split photo hero + chapter index | yes | high |
| `/story` | Tell the Tagum upbringing and March 2022 move | dark photographic masthead → light editorial origin → crossing | yes | high |
| `/work` | Show hands-on work and competitive sport | typographic masthead → image-led work rows → sports pair | yes | medium |
| `/curiosity` | Explore computers, DIY, design, and learning | dark type-led masthead → lime disclosure spread | yes | medium |
| `/now` | Explain current design work and offer contact paths | dark masthead → illustrated workbench → lime close | yes | high |
| unknown | Explain missing page and recover | compact dark error message + routes | yes | rare |

**Shell:** Document metadata, font links, skip link, desktop nav, native mobile `<details>` nav, footer, brand, shared CSS and tiny JS. Mobile navigation is a disclosure that works without JS. Current route uses `aria-current="page"` and a visible lime underline/dot. The brand always links to `/`, the contact shortcut to `/now#connect`.

**Build order:** shared shell → home → story → now → work → curiosity → 404. Each route uses authored server HTML and shows content with JS disabled.

## Component inventory

| component | named variants | budget | used |
| --- | --- | ---: | --- |
| `NavLink` | default / current (state, not additional variant) | 1 + state | all routes |
| `ActionLink` | lime-filled / ink-filled / inline-light / inline-dark | 4 | hero, chapter index, inner pages, close |
| `MobileMenu` | closed / open (state) | 1 + state | all routes at ≤800px |
| `Disclosure` | closed / open (state) | 1 + state | curiosity |

| non-control component | variants | used |
| --- | --- | --- |
| `PageShell` | one | all routes |
| `SectionRail` | dark / light, driven by section context | story, work, now |
| `ChapterHero` | photographic / type-led, same structure | inner routes |
| `MediaFigure` | overlay-caption / inline-caption | home, story, work, now |
| `WorkRow` | image / diagram | work |
| `ChapterIndex` | one list row | home |
| `ChapterPager` | previous and/or next | inner routes |
| `PhotoCredits` | one | footer |

**Rule:** New control variants need a reason and an inventory update before CSS; do not invent unique cards for every page.

## State matrix

| control | default | hover | focus-visible | active | disabled / loading / empty / error | selected/current |
| --- | --- | --- | --- | --- | --- | --- |
| nav link | readable text | lime color on hover-capable pointer | 3px lime outline | native | n/a: navigation is always available | `aria-current="page"` + underline |
| action link | named variant | color/translate on hover-capable pointer | 3px context-contrast outline | native | n/a: all destinations are known | n/a |
| mobile menu | summary + links | lime on hover-capable pointer | 3px lime outline | native details | n/a: no network request | `[open]` marker and menu visible |
| disclosure | summary + copy | underline/ink on hover-capable pointer | 3px ink outline | native details | n/a: content authored at render | `[open]` marker rotates |

There are no forms, data fetching, spinners or client-side empty screens. The only error state is the server-rendered 404 page: "That chapter isn't here" with Home and Story recovery links. All text remains full contrast; no disabled or dimmed text states.

**Reachability:** navigate to each exact route. Visit `/not-a-page` for error state; `#content` skip link and details are keyboard-accessible without JS. Current state changes by route.

## Density
No charts or tables. Titles do not truncate; long lines wrap at 390px and 320px. Captions are supplementary, story prose stays visible, and artwork is never represented as a portrait of Kurt.

## Gate checklist
- [x] Every route has a job and layout family.
- [x] Shell, mobile collapse, and current marker are defined.
- [x] Control variants have named budgets and states.
- [x] No inaccessible empty/loading controls; 404 has recovery copy.
- [x] Build order follows traffic and reuse.
- [x] March 2022 remains the existing signature on Story; no second peak added.
