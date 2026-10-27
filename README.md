# Kamhype — From Tagum City to Las Vegas

A **five-chapter Bun + TypeScript site** about Kurt Anthony Morales (Kamhype): from Tagum City, Davao del Norte, Mindanao to Las Vegas, with chapters on family, work, sport, curiosity, and web design, plus standalone portfolio previews.

## Run locally

Requires Bun 1.1 or newer.

```sh
bun install
bun run start
```

Visit [http://localhost:3000](http://localhost:3000). The server binds to `127.0.0.1` by default. Set `PORT` to change the port or `HOST` for a different interface. Use `bun run dev` for watch mode.

## Routes

- `/` — introduction and chapter index
- `/story` — Tagum roots, grandparents, the March 2022 move, and Kurt's future goal to build wealth and America's biggest parking lot line striping company
- `/work` — construction, painting, event organizing, basketball and billiards
- `/curiosity` — computers, DIY, design and learning
- `/now` — current work and contact links
- `/api/journey` — structured JSON biography
- `/health` — Bun health response
- `/previews/index.html` and `/previews/<id>.html` — 42 self-contained portfolio/story previews and their gallery

Unknown pages get a helpful HTML 404 instead of a homepage fallback. `/story/` and other trailing-slash variants render the same page. The mobile menu, disclosures, navigation and full content work without JavaScript.

## Components and files

- `src/site/components.ts` — reusable server-rendered shell, navigation, page hero, action links, media figure, chapter index and next/previous pager.
- `src/site/pages.ts` — five composed pages and the 404 view.
- `src/data/journey.ts` — structured biography shared by the page renderer and JSON API.
- `src/server.ts` — Bun route handler and static asset serving.
- `public/style.css`, `public/pages.css`, `public/main.js` — editorial design, route components, and optional Grid/List and menu enhancements.
- `public/assets/` — illustrative location/work photos, supplied personal portraits, artwork, website previews and completion-badge screenshots. Original files are preserved.
- `src/site/asset-gallery.ts` — content-based placement and descriptions for 34 supplied images; see `design/ASSET-PLACEMENT.md`.
- `scripts/prepare-images.ts` — run with `bun scripts/prepare-images.ts` (requires ImageMagick) to generate missing responsive WebP previews without overwriting originals.
- `scripts/build-previews.ts` — regenerate the 42 checked-in, self-contained pages in `public/previews/` from `src/site/asset-gallery.ts` and the reviewed story inventory. Requires ImageMagick's `identify` to record the dimensions of existing images; it does not copy or re-encode them.
- `design/` — research notes, redesign plan, visual contract, component inventory and archived story direction.

There are **zero runtime packages**. TypeScript and Bun types are dev-only. Before public deployment, confirm redistribution rights for the repository's existing images.

## GitHub Pages

GitHub Pages cannot run the Bun server, so `.github/workflows/pages.yml` exports a static copy on every push to `main`: `scripts/export-static.ts` renders all five routes with the same `renderRoute()` the server uses, copies `public/`, and writes `404.html`, `.nojekyll`, `api/journey.json`, and the `CNAME` for the personal-site subdomain (`kurtmorales.kmwebdesign.xyz`, set in the workflow). For a project Pages URL instead of a custom domain, set `BASE_PATH=/kamhype-bun` and drop the `CNAME` in the workflow. For Actions-based Pages deployments, GitHub ignores the artifact's `CNAME` file: set the same hostname in repository Settings → Pages; the export uses `CNAME` to validate its own URLs. The deploy job installs from the committed lockfile, runs tests and typechecks, then exports and publishes; failed checks stop deployment. CodeQL runs separately on pushes and pull requests. The Bun server (`bun run start`) remains the full version, including `/api/journey`, `/health`, and `/previews/*.html`. Portfolio previews are linked from the main galleries and copied from `public/previews/` into the Pages artifact. The previously retired desk illustration is restored solely for its clearly labelled illustration preview; `/now` still uses the agency homepage image.

## Search discovery

The five pages have distinct titles, descriptions, social metadata and honest WebPage/Person structured data. The site has SVG, PNG and Apple touch icons, a manifest and a locally generated social card. The export writes `robots.txt` and, only when `SITE_URL` is set, `sitemap.xml` with the five public routes. The Bun server serves the same discovery responses. On a GitHub Pages project subpath, `robots.txt` does not live at the host root and cannot set crawler policy for the host; submit the sitemap directly or use a verified custom domain.

Set `SITE_URL` to the **confirmed public HTTPS URL of this Kamhype site**, including any project base path, before publishing canonical URLs or a sitemap (for GitHub Actions, set the repository variable `KAMHYPE_SITE_URL`). Do not infer the address from a request host or the current `CNAME`: the apex `kmwebdesign.xyz` is linked here as a separate studio and is not the personal site's canonical address. For example, after verifying a domain and its DNS: `SITE_URL=https://your-confirmed-domain.example CNAME=your-confirmed-domain.example bun run build:pages`. Without `SITE_URL`, the export intentionally omits absolute canonicals and the sitemap instead of advertising an unverified domain. `BASE_PATH` and `SITE_URL` must agree.

Once a verified deployment is reachable, submit its sitemap in Google Search Console and Bing Webmaster Tools. Other crawlers can discover it through `robots.txt` and links; submission does not guarantee indexing. Genuine external backlinks require links from independently controlled, relevant sites, not generated markup or link spam.

## Preview inventory

The preview gallery has the 41 image subjects listed in `design/AGENT-INSTRUCTIONS-PREVIEWS.md` plus one code-only homepage design rendered locally from `public/assets/kmwebdesign.html`. That local source HTML remains untracked; only its original screenshot and two curated WebP screenshots are published. The separate freelance HTML design is already represented by its existing screenshot. Regenerate pages after changing the reviewed inventory with `bun run build:previews`; commit the resulting HTML changes after reviewing them. Story-photo source credits appear on their preview pages, and completion badges are labelled as coursework, not certifications. Do not treat prices, sample metrics, or availability shown inside screenshots as current offers or results.

## Verify

```sh
bun run test
bun run check
bun run build
bun run build:pages
```
