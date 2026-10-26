# Homepage refinement

## What changed
- Replaced the tall overlapping-city hero composition with the supplied casual portrait. Removed its duplicate lower-page section. The March 2022 crossing remains on Story.
- Fixed the chapter heading's missing grid display and tightened hero spacing.
- Added the owner-confirmed focus on learning Rust and cybersecurity with local AI agents, including structured `/api/journey` data.
- Added six illustrated sliding cards: Rust, cybersecurity and local AI agents (learning); Bun, TypeScript and HTML/CSS (this website's implementation). No unconfirmed agent products or installed programs are named.
- Added a testimonials section with an explicit empty state and feedback contact. Real quotes, attribution and publication permission are needed before populating it.

## Interaction and motion
Native horizontal scrolling and CSS scroll snapping work without JavaScript. JavaScript adds previous/next buttons with boundary states; there is no autoplay or duplicated carousel content. The portrait has a one-shot transform entrance. Card motion uses feature-detected native scroll timelines, including the animation-range support check. Reduced motion disables both effects and smooth scrolling. Unsupported timeline browsers retain plain usable cards.

## Verification
14 Bun tests, typecheck, build, JS syntax and diff checks pass. Chromium all-route layout checks pass at 320/390/768/1440px. Slider tests cover previous/next boundaries at all four widths with normal/reduced motion. Native keyboard scrolling works with JavaScript disabled. Desktop hero and mobile slider screenshots were visually inspected. The active LSP probe found no type errors; auxiliary style hints and pre-existing URL/logging warnings remain.

Preview: http://127.0.0.1:3000. No commit, push or deployment. No original image was changed.
