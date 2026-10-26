# Kamhype — editorial gallery direction (2026-10-26)

This replaces the first-pass direction for the new implementation. Reference observations and uncertainties are in [LUSION-RESEARCH.md](LUSION-RESEARCH.md); implementation seams are in [REDESIGN-PLAN.md](REDESIGN-PLAN.md).

## 1. Signature / moment of care
The March 2022 Tagum → Las Vegas crossing is the only full-bleed dramatic interruption. Before it, a lit editorial index gives visitors a clear choice of chapters; after it, the story stays legible and grounded.

## 2. Color
Cool-neutral gallery `#f2f3f5` (approx. OKLCH L .95, C .004), ink `#171d1a`, night `#101918`, directional chartreuse `#dcff72` (approx. OKLCH .89 .17 119). Tier: **restrained** on the lit pages; the dark crossing earns the saturated accent. Target full-site mean lightness ~0.66 (light home/origin/curiosity alternating with dark work/crossing/now). Not lavender tech, warm cream, or the previous near-black-everywhere treatment. Gallery footage/reference is nearly monochrome; keep saturation lower than the old site outside the crossing.

## 3. Type
DM Sans regular/medium for gallery-scale editorial headlines and readable body, Barlow Condensed bold only where the physical work and crossing need impact, IBM Plex Mono sparingly for coordinates. This is a contrast of quiet gallery voice and worksite poster energy, not two competing similar sans typefaces throughout. Do not import Lusion's Aeonik font or default to Inter. Oversized hero text is a deliberate page subject, not an oversized prose heading.

## 4. Grid break
The chapter gallery shifts scale and alignment: the first item spans wide, the next two sit at unequal heights/widths, and the final item resolves into a horizontal strip. The story crossing slices across the editorial page as a single full-bleed cut. On narrow screens restore natural reading order, not a cropped collage.

## 5. Motion budget
Two families maximum: (1) subtle, one-time transform/opacity entrance for visual media, (2) a decorative directional route line tied to scroll only when native CSS scroll-driven animation and its full range support are present. No essential text opacity gate, no JS scroll handler, no continuous heavy canvas/WebGL, no sound. UI toggle response ~150ms; native menu/disclosure stays usable without animation. Reduced motion removes transform/scroll movement but preserves focus and state.

## 6. Reflex check
First-order personal portfolio reflex: black surface, lime/glow, enormous condensed slogan, stats and a card grid. Second-order reflex: cream serif manifesto and gratuitous editorial emptiness. Chosen deviation: documentary geography and real kinds of labor in a **cool-lit** modular gallery, with one dark crossing that carries the factual move rather than invented spectacle. The reference supplies a browsing rhythm, not Kurt's identity.

## 7. House tells deliberately broken
1. Near-black by default → a bright home/index and origin pages; dark is a narrative cut, not the site wallpaper.
2. Service-label-on-every-corner → one purposeful chapter index marker or location label; larger legible navigation and fewer pseudo-instrument labels.
3. Scroll-instruction footer → no repeated decorative scroll prompts. The visible next chapter and gallery do the wayfinding.

## Constraints
No borrowed logos, screenshots, typeface files, project images or copy from Lusion. No invented credentials, quotes, trophy counts, degrees, timelines or client list. Prior existing illustrative photo redistribution rights remain a publishing question. The full page must be readable and navigable with JavaScript disabled and in reduced motion.
