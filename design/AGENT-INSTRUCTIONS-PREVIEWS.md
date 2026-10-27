# AGENT INSTRUCTIONS — Build an HTML preview file for every portfolio item on this site

Site: Kamhype — Kurt Anthony Morales (Bun + TypeScript, server-side rendered, no client framework).
Source of truth for items, titles and descriptions: `src/site/asset-gallery.ts`. Do not invent new items, titles or copy.

## The task

1. For EVERY item in the inventory below, create ONE standalone HTML preview file:
   `public/previews/<id>.html` (example: `public/previews/km-agency.html`).
2. Each file is fully self-contained: all CSS in a single `<style>` tag in the same file,
   no external stylesheets, no JavaScript required to view it.
3. Images: reference the existing files by absolute path (`/assets/...` or
   `/assets/curated/...`). Never copy, re-encode, rename or base64-embed the images.
4. Also create `public/previews/index.html`: a gallery listing every preview,
   grouped by the sections below, each with its title and a link to its file.
5. When done, start the Bun dev server, open every preview URL, and confirm each one
   returns 200 with its image loading. Report the full list of URLs.

## Individual website demos — REQUIRED, and different from previews

A preview shows a screenshot of a design. A demo is the design rebuilt as a real,
working web page. Kurt asked for demos; a screenshot page does NOT count as a demo.

1. For every item in the Websites and Experiments/interface sections (including
   code-only website designs), ALSO build `public/demos/<id>.html`: a live HTML
   page that recreates that design — real layout, real text, real buttons.
2. Interface tools must actually work in the browser: the password generator
   generates, the team switcher switches, the idea engine generates. Keep demo
   scoring/feedback clearly labelled as demo logic; never present it as a real
   service, a real booking, or a real result.
3. Every demo carries a top bar ("Live demo — a working recreation of this design
   by Kurt Anthony Morales") with links to `/demos/index.html`, the previews
   index, and the main site, plus the ownership footer from the Ownership section.
4. Build `public/demos/index.html` listing every demo with a one-line description.
5. Reference images by absolute path like the previews do; never re-encode them.
6. Verify every demo returns 200 and renders before reporting done.

Demos already built (2026-10-27) for: km-agency, km-freelance, restaurant-studio,
manila-bbq, manila-food, ravfia-operations, ravfia-striping, bin-wash-web,
portfolio-dark, portfolio-orange, starter-landing, dashboard, account-settings,
team-switcher, secure-pass, tube-ideas, viral-predict, km-immersive-3d.
Maintain these; do not replace them with screenshot pages.

## Page structure (every preview file)

- Header: item title, section name, and the item's exact description from
  `src/site/asset-gallery.ts` (for story photos use the description in this file).
- The image itself, full width of the content column, never cropped
  (`object-fit: contain`), with its real width/height attributes.
- A "What this is" line: use the handling note for that item below. Do not add claims.
- Link back to the main site and to `/previews/index.html`.

## Design system (previews must match the site)

- Colors: white #ffffff, warm gray #f7f7f5, borders #e8e8e4, text #1a1a1a,
  muted #6b6b6b, accent #2563eb.
- Font: Inter. Cards: 1px border, 12px radius. No gradients, no shadows, no dark
  backgrounds in the preview pages themselves (the images keep their own look).
- Max content width 960px, generous whitespace, mobile-safe at 360px.

## Web compliance and accessibility — required on every preview

Accessibility (target WCAG 2.2 AA):
- Semantic landmarks on every page: one `header`, one `main`, one `footer`;
  exactly one `h1` (the item title); heading levels in order, never skipped.
- Every image carries descriptive alt text — use the item's description from
  this file or `src/site/asset-gallery.ts`. Purely decorative images get `alt=""`.
- Contrast: body text at least 4.5:1 against its background, large headings at
  least 3:1. The design-system colors pass on white and #f7f7f5; check any other
  pairing before using it, and never put muted #6b6b6b text on a tinted panel
  without verifying the ratio.
- Links must be identifiable without color alone (underline or border), every
  interactive element gets a clearly visible focus indicator, and the index page
  must be fully usable by keyboard alone, in a logical tab order.
- Touch targets on links and buttons: at least 44x44px.
- Respect `prefers-reduced-motion`: no autoplay, no required animation; the
  previews are static by design — keep them that way.
- Declare `lang="en"`, a viewport meta tag, and a unique `<title>` per page.
  Keep each image's real width/height attributes so pages do not shift while
  loading, and text must survive 200% zoom without clipping or overlap.

Web compliance:
- Valid HTML5, no console errors, no mixed content; all paths resolve on the
  site's own origin.
- No analytics, trackers, cookies or local storage on preview pages. No external
  requests beyond the site's own assets (fonts local or system stack).
- Claims discipline: prices, ratings and offers appear only inside the artwork
  images, never retyped as live offers; learning badges stay labelled as course
  completion, not certification (see the inventory).
- The copyright footer from the Ownership section appears on every page,
  unchanged.
- Performance: use the curated WebP images, lazy-load below-the-fold images on
  the index page, and keep each preview self-contained as specified above.

## Rules that apply to every item

## Ownership — read this first

Every design on this site is the work of Kurt Anthony Morales. He builds from
proven online templates and customizes them to his needs; the finished designs
are his work. All copyright claims for these designs are held under his entity.

- Present each item as his design, under his name. Never describe any item as
  someone else's work, a third-party product, or "not his".
- Every preview file carries this footer line, unchanged:
  "© Kurt Anthony Morales — KM Web Design. All rights reserved."
- Do not strip, soften or qualify his ownership anywhere in a preview.
- Prices, ratings, phone numbers and offers visible INSIDE an image are part of that
  artwork. Show the image as-is; never retype them into the page as current offers.
- Do not add hiring/booking calls to action. KM Web Design is temporarily closed.

## Inventory — what is actually in each image (visually verified)

### Portraits (the site owner, Kurt Anthony Morales)

- `portrait-casual` — original `public/assets/me2.png`, previews
  `public/assets/curated/portrait-casual-wide.webp` / `-small.webp`.
  Kurt standing, hands in pockets, cream knit cardigan over a navy t-shirt, jeans,
  silver watch; background removed (cutout). Place on a light card; do not put it on
  a busy background.
- `portrait-formal` — original `public/assets/me.png`, curated pair
  `portrait-formal-wide/small.webp`. Kurt in a light gray suit and pink shirt,
  dark studio-gradient background. This is a studio portrait, NOT a photo of the
  March 2022 move; never caption it as a historical photo.

### Print designs

- `cleaning-vector` — `public/assets/ravfia-cleaning-front.svg` (vector, no curated
  pair). Flat black-and-yellow Ravfia Cleaning card artwork with a green leaf mark.
- `bin-wash-cards` — original `BinCleaningBusinessCardMockup.png`. Ravfia Bin Wash
  business cards, front and back, black/yellow with blue and black bin photos.
  Back lists services: residential bin cleaning, deodorizing & sanitizing, recurring
  monthly plans, HOA & commercial. Front carries Kurt's name, phones and address —
  artwork only (see rules).
- `cleaning-cards` — original `RavfiaCleaning.png`. Ravfia Cleaning Service cards,
  front and back, black/gold. Back lists deep & recurring cleaning, odor-free
  treatments, move-in/move-out, office & commercial, and the NV business license
  number printed in the artwork.
- `bin-wash-flyer` — original `Flyer.png`. Tall Ravfia flyer: "DIRTY BINS? WE CLEAN
  THEM!", before/after bin photos, a per-bin price and cleaning-service panels, Las
  Vegas skyline at the top. The price and contacts are artwork, not current offers.

### Websites (screenshots of homepage designs)

- `km-agency` — `kmwebdesign-agency.webp`. KM Web Design agency homepage, dark
  navy/violet: "We Build Digital Empires That Scale." with an "AI Strategy Audit"
  panel on the right.
- `km-freelance` — `kmwebdesign-freelance.webp`. KM Web Design freelance homepage,
  dark teal gradient: "Clean websites for small businesses that need speed, trust,
  and more leads." with an availability card (Las Vegas, HTML/CSS/JavaScript).
- `restaurant-studio` — `kurtmorales.webp`. KM Web Design restaurant direction,
  warm beige/orange serif: "Turn local searches into tables. Websites built for
  restaurants." with a capability checklist card.
- `manila-bbq` — `manilabbq.webp`. Manila BBQ restaurant homepage, cream/brick red:
  "Authentic Filipino BBQ & Seafood in Henderson", menu cards with dish prices and
  a ratings card — all inside the screenshot.
- `manila-food` — `screenshot-2026-08-13_22-08-06.png`. Second Manila BBQ layout:
  "Big Filipino flavor. Made to share." with a photo grid of Filipino dishes
  (whole fish, lechon, rice plates).
- `ravfia-operations` — `ravfia-strategic.webp`. Ravfia Strategic Operations
  homepage, pale blue/white: "Reliable contracting. Accountable service delivery."
  with Scope / Coordinate / Deliver cards around the RSO mark.
- `ravfia-striping` — `ravfia-striping.webp`. Ravfia striping homepage, pale gray:
  "SCOPE BEFORE PAINT." Note: in this screenshot the hero's stock photo did not
  render, so its alt text is visible, and the page itself credits the photo as
  illustrative stock, not Ravfia work. Use the screenshot exactly as it is.
- `bin-wash-web` — `Screenshot_20251204_011104.png`. Odor-Free Ravfia bin-cleaning
  website, dark navy/green: "Clean Bins. Healthier Home." with a "99.9% Germ & Odor
  Elimination" graphic. Those claims live inside the screenshot artwork.
- `portfolio-dark` — `kurt_morales_website.jpeg`. Older personal portfolio, dark:
  "Kurt — Builder, AI Explorer, Entrepreneur" with a KM monogram. The screenshot
  includes the browser window chrome; keep it, it is part of the capture.
- `portfolio-orange` — `screenshot-2026-05-12_01-30-23.png`. Alternate portfolio
  direction, dark with orange type: "Purposeful design. Fast performance." and a
  current-availability card.

### Experiments and interface studies

- `secure-pass` — `darkmode.jpeg`. "RavFia SecurePass" password-generator screen,
  dark UI: generated password field, length slider at 16, character options,
  STRONG indicator, and a review form below. It is a design screenshot, not a
  working tool; the visible password is a sample.
- `tube-ideas` — `tubeideas.webp`. "YouTube Idea Engine", dark UI: niche chips
  (Tech & AI, Finance, Fitness, Cooking, Gaming, Travel, Education, Business),
  optional topic field, gradient "Generate Ideas" button.
- `viral-predict` — `screenshot-2026-05-12_14-39-12.png`. "VIRAL PREDICT" concept,
  light UI with orange type, niche input and an empty results area. Interface
  study only — no predictive capability exists or may be claimed.
- `starter-landing` — `landing-page.png`. Kurt's "A Multi-tenant Next.js Starter
  Template" landing page design (Next.js + Shadcn UI + Stack Auth), clean light
  hero with "Get Started" / "GitHub" actions. His design and build.
- `dashboard` — `dashboard-overview.png`. Kurt's SaaS dashboard design: revenue
  and sales cards, bar chart, recent-sales list. The metrics and names visible
  (e.g. $45,231.89 revenue, named customers) are the content displayed in the
  design — show the screenshot as-is, exactly like the site does.
- `account-settings` — `account-settings.png`. Kurt's account settings screen
  design: profile/team controls, an "ACME Inc." team and a "John Doe" user shown
  as the design's displayed content.
- `team-switcher` — `team-switcher.png`. Close-up of Kurt's team switcher
  dropdown design ("My team" / "ACME Inc.") from the same dashboard set.
- `ravfia-coin` — `ravfiacoin.png`. Promotional graphic: a gold "RAVFIA COIN RFCN"
  coin on a Solana-themed purple background with supply/feature claims printed in
  the artwork. Show as graphic design ONLY. Do not repeat its token claims as
  facts, and do not present it as an endorsement or an offer.
- `type-poster` — `printing-money-is-fun.png`. Emerald 3D typography poster:
  "THE GOOD LIFE / PRINTING MONEY IS FUN / MAKE IT, GROW IT, ENJOY IT". Pure
  typography artwork.

### Learning (Google Cloud completion badges — screenshots)

Each image is a Google Cloud award screenshot naming Kurt Anthony Morales.
These are COURSE COMPLETION badges. Always label them "course completion badge —
coursework, not a professional certification" in the preview.

- `cloud-infrastructure` — "Modernize Infrastructure and Applications with Google
  Cloud" — earned Oct 25, 2026.
- `cloud-ai` — "Innovating with Google Cloud Artificial Intelligence" — Oct 12, 2026.
- `cloud-data` — "Exploring Data Transformation with Google Cloud" — Jun 3, 2026.
- `cloud-digital` — "Digital Transformation with Google Cloud" — Jun 3, 2026.
- `agent-adk` — "Build Your First Agent with Agent Development Kit (ADK)" —
  Apr 14, 2026.
- `enterprise-agents` — "Enterprise Agents and Use Cases" — Mar 17, 2026.
- `agent-fundamentals` — "Agent Fundamentals" — Mar 17, 2026.
- `cloud-engineer-prep` — "Preparing for Your Associate Cloud Engineering" /
  "Associate Cloud Engineer Journey" — Aug 2, 2025. This is exam PREPARATION
  coursework. It is not a certification and not evidence of passing any exam.
- `generative-mlops` — "Machine Learning Operations (MLOps) for Generative AI" —
  Jun 30, 2025.

### Designs that exist only as code (no image yet)

Kurt has more designs that are not images yet — they exist only as code. Handle
them in the same pass:

1. Inventory first: scan this repo (`src/`, `design/`, `pages-dist/`) and any
   project folder Kurt names for complete page or app designs that have no
   image in the inventory above. Report the list you found before building.
2. Run or build each design locally with Bun and capture a screenshot at
   1440px wide (plus a 480px-wide small version). Save them as
   `public/assets/curated/<id>-wide.webp` and `<id>-small.webp`, and keep the
   untouched original screenshot in `public/assets/`.
3. Give each an id, a title, and a one-line description based on what the
   rendered design actually shows. Do not invent features it does not show.
4. Build its preview page in `public/previews/` exactly like the others and add
   it to the index, grouped with its section.
5. The ownership section above applies in full: it is Kurt's design, copyright
   under his entity, same footer line.

### Story photos (used on the story/journey pages, originals in `public/assets/`)

- `tagum.jpg` — aerial view of Tagum City, Philippines: dense rooftops, a main
  highway, heavy greenery, mountains behind. The "where it started" image.
- `vegas.jpg` — Las Vegas Strip at dusk: Paris tower, Bellagio, High Roller,
  moon over the mountains. The "where he landed" image.
- `basketball.jpg` — street basketball game in the Philippines: kids and teens
  playing barefoot on a yellow-painted street court. Atmosphere photo for the
  sports chapter; do not claim any person in it is Kurt.
- `billiards.jpg` — close-up of a racked set of billiard balls (8-ball in front),
  two cue sticks and chalk on green felt, dark background.
- `painter.jpg` — a painter in a yellow hard hat rolling white primer onto an
  interior wall, ladder beside him. Represents the paint-work years; do not claim
  the person is Kurt.
- `construction.jpg` — a construction worker in a blue hard hat raising a hammer,
  crew working on road formwork behind him. Represents the construction years;
  do not claim the person is Kurt.
- `designer-desk.jpg` — an ILLUSTRATION (not a photograph): a futuristic desk
  with three monitors showing wireframes, tools and parts, Las Vegas skyline and
  the Sphere through the window. Label it "illustration" wherever it is used;
  never present it as a photo of a real desk or office.

## Verification before you report done

1. `bun run` the dev server; request every file in `public/previews/` and record
   the HTTP status of each (all must be 200).
2. Confirm each preview's image renders (not a broken-image icon) at desktop and
   360px mobile widths.
3. Confirm `index.html` links to every preview (the 41 image items plus every
   code-only design found) and every link works.
4. Run an accessibility pass on the index page and at least three preview pages
   (Lighthouse or axe): zero critical violations, contrast and focus checks
   included, plus one keyboard-only pass through the index. Report the scores
   and any violation you could not fix, with the reason.
5. Report: the list of preview URLs, anything you could not build, and why.
   Do not report success for a file you did not actually load.
