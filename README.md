# Kamhype — Not Given. Built.

A **five-page Bun + TypeScript site** about Kurt Anthony Morales (Kamhype): from Tagum City, Davao del Norte, Mindanao to Las Vegas, with chapters on family, work, sport, curiosity, and web design.

## Run locally

Requires Bun 1.1 or newer.

```sh
bun install
bun run start
```

Visit [http://localhost:3000](http://localhost:3000). The server binds to `127.0.0.1` by default. Set `PORT` to change the port or `HOST` for a different interface. Use `bun run dev` for watch mode.

## Routes

- `/` — introduction and chapter index
- `/story` — Tagum roots, grandparents, education and the March 2022 move
- `/work` — construction, painting, event organizing, basketball and billiards
- `/curiosity` — computers, DIY, design and learning
- `/now` — current work and contact links
- `/api/journey` — structured JSON biography
- `/health` — Bun health response

Unknown pages get a helpful HTML 404 instead of a homepage fallback. `/story/` and other trailing-slash variants render the same page. The mobile menu, disclosures, navigation and full content work without JavaScript.

## Components and files

- `src/site/components.ts` — reusable server-rendered shell, navigation, page hero, action links, media figure, chapter index and next/previous pager.
- `src/site/pages.ts` — five composed pages and the 404 view.
- `src/data/journey.ts` — structured biography shared by the page renderer and JSON API.
- `src/server.ts` — Bun route handler and static asset serving.
- `public/style.css`, `public/pages.css`, `public/main.js` — base design, route components and optional motion enhancement.
- `public/assets/` — credited illustrative images, **not portraits of Kurt**.
- `design/` — visual contract, route/component inventory and original story direction.

There are **zero runtime packages**. TypeScript and Bun types are dev-only. Before public deployment, confirm redistribution rights for the repository's existing images.

## Verify

```sh
bun run test
bun run check
bun run build
```
