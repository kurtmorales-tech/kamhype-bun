# Kamhype — US Journey & Career

Futuristic personal site for **Kurt Anthony Morales (Kamhype)** — from Tagum City, Davao del Norte, Mindanao, Philippines to Las Vegas, USA (March 2022).

Construction laborer → paint laborer → event organizing → web designer & builder.
Grade 7–10 only. Raised by grandparents. Billiards & basketball trophies.
#1 problem: curious about everything — mostly computers and DIY.

## Stack

- **Runtime:** Bun (TypeScript, zero dependencies)
- **Server:** `src/server.ts` — `Bun.serve()`, static files + JSON API
- **Content:** `src/data/journey.ts` is the single source of truth, served at `/api/journey`
- **Design:** `public/index.html` — futuristic dark hero, animated starfield, live Las Vegas clock, interactive 6-chapter journey timeline, Curiosity Lab, light + dark mode

## Run it

```bash
bun install        # no dependencies — instant
bun run dev        # watch mode
# or
bun run start      # production
```

Open http://localhost:3000 (set `PORT` to change).

## Routes

| Route | What it does |
|---|---|
| `/` | The site |
| `/api/journey` | Kurt's journey as JSON (from `src/data/journey.ts`) |
| `/health` | `{ ok, runtime, version }` health check |

## Build a standalone server binary bundle

```bash
bun run build      # outputs dist/server.js (run with: bun dist/server.js)
```

## Layout

```
public/
  index.html       # the futuristic design (same design as the hosted version)
  assets/          # tagum, vegas, construction, painter, basketball, billiards, designer-desk
src/
  server.ts        # Bun server
  data/journey.ts  # typed content
```
