// Regenerate the checked-in standalone portfolio previews from the reviewed inventory.
// Requires ImageMagick's identify to record each displayed asset's intrinsic dimensions.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { experiments, learning, portraits, printDesigns, reviewedAssets, websites } from "../src/site/asset-gallery.ts";
import { escapeHtml } from "../src/site/components.ts";

type GalleryItem = (typeof reviewedAssets)[number];
type Size = { width: number; height: number };
type Preview = {
  id: string;
  section: string;
  title: string;
  description: string;
  note: string;
  image: string;
  size: Size;
  small?: string;
  smallSize?: Size;
  mobileArtDirection?: boolean;
  credit?: string;
};

const root = resolve(import.meta.dir, "..");
const publicDir = join(root, "public");
const outputDir = join(publicDir, "previews");
const copyright = "© Kurt Anthony Morales — KM Web Design. All rights reserved.";
const badgeNote = "course completion badge — coursework, not a professional certification.";

const notes: Record<string, string> = {
  "portrait-casual": "Kurt Anthony Morales in a cream cardigan over a navy T-shirt, shown as a cutout on a light card.",
  "portrait-formal": "A studio portrait of Kurt in a gray suit and pink shirt; it is not a historical image of his move.",
  "cleaning-vector": "Kurt's flat black-and-yellow Ravfia Cleaning vector card artwork with a green leaf mark.",
  "bin-wash-cards": "Ravfia Bin Wash card artwork showing front and back. Contacts and services inside the image are artwork, not current offers.",
  "cleaning-cards": "Ravfia Cleaning Services card artwork showing front and back. The license and contacts appear only inside the image.",
  "bin-wash-flyer": "Ravfia flyer artwork with before-and-after bin photos. Printed prices and contacts are artwork, not current offers.",
  "km-agency": "Kurt's KM Web Design agency homepage direction, with a dark typographic hero and a strategy-audit panel.",
  "km-freelance": "Kurt's teal KM Web Design freelance homepage direction. Availability shown inside the screenshot is not a current offer.",
  "restaurant-studio": "Kurt's warm editorial restaurant-web-design homepage direction. Text inside the screenshot is part of the design.",
  "manila-bbq": "Kurt's Manila BBQ homepage design. Menu prices and the ratings card appear only inside the screenshot.",
  "manila-food": "A second Manila BBQ homepage direction focused on food photography and an editorial headline.",
  "ravfia-operations": "Kurt's Ravfia Strategic Operations homepage direction built around contracting and service-delivery messaging.",
  "ravfia-striping": "Kurt's striping homepage design. Its unrendered hero stock-photo alt text and illustrative-stock credit are part of the screenshot, not evidence of completed work.",
  "bin-wash-web": "Kurt's Ravfia bin-cleaning website design. Service and elimination claims appear only in the screenshot artwork.",
  "portfolio-dark": "Kurt's older portfolio direction; browser-window chrome is part of the captured screenshot.",
  "portfolio-orange": "Kurt's alternate portfolio direction. Availability shown inside the screenshot is part of the artwork.",
  "secure-pass": "A password-generator interface study by Kurt. It is a design screenshot, not a working tool; any visible password is sample content.",
  "tube-ideas": "Kurt's YouTube idea-generation interface study. The controls shown are part of the design, not a live generator here.",
  "viral-predict": "Kurt's Viral Predict interface study only; no prediction capability is claimed or available here.",
  "starter-landing": "Kurt's Next.js starter-template landing-page design and build. The buttons are visible artwork, not live actions on this preview.",
  "dashboard": "Kurt's SaaS dashboard design. Revenue, sales figures and names are example content inside the screenshot, not business results.",
  "account-settings": "Kurt's account-settings design. Team and user names in the screenshot are sample interface content.",
  "team-switcher": "A close-up of Kurt's dashboard team-switcher design, showing example team and account labels.",
  "ravfia-coin": "Kurt's promotional graphic design only; printed token supply and feature claims are not verified facts, an endorsement or an offer.",
  "type-poster": "Kurt's emerald dimensional typography poster. The lettering is artwork, not a financial claim or offer.",
  "cloud-infrastructure": badgeNote,
  "cloud-ai": badgeNote,
  "cloud-data": badgeNote,
  "cloud-digital": badgeNote,
  "agent-adk": badgeNote,
  "enterprise-agents": badgeNote,
  "agent-fundamentals": badgeNote,
  "cloud-engineer-prep": `${badgeNote} This exam-preparation coursework is not evidence of passing an exam.`,
  "generative-mlops": badgeNote,
};

const story = [
  {
    id: "tagum", file: "tagum.jpg", title: "Tagum City",
    description: "Aerial view of Tagum City, Philippines: dense rooftops, a main highway, heavy greenery and mountains behind.",
    note: "The where-it-started story image; it depicts Tagum City, not a specific moment in Kurt's life.",
    credit: "Photo credit: Property Report Philippines",
  },
  {
    id: "vegas", file: "vegas.jpg", title: "Las Vegas",
    description: "Las Vegas Strip at dusk: the Paris tower, Bellagio, High Roller and moon over the mountains.",
    note: "The where-he-landed story image; it illustrates Las Vegas without documenting Kurt's arrival.",
    credit: "Photo credit: Lenna for Nevada",
  },
  {
    id: "basketball", file: "basketball.jpg", title: "Street basketball",
    description: "Kids and teens playing barefoot on a yellow-painted street basketball court in the Philippines.",
    note: "An atmosphere photo for the sports chapter. No person in the photograph is claimed to be Kurt.",
    credit: "Photo credit: Vieclam Philippine",
  },
  {
    id: "billiards", file: "billiards.jpg", title: "Billiards",
    description: "Racked billiard balls with the eight ball in front, two cue sticks and chalk on green felt.",
    note: "A close-up atmosphere photo for the billiards chapter.",
    credit: "Photo credit: Marcus Scigliano Photography",
  },
  {
    id: "painter", file: "painter.jpg", title: "Painting work",
    description: "A painter in a yellow hard hat rolling white primer onto an interior wall beside a ladder.",
    note: "This represents the paint-work years; the person pictured is not claimed to be Kurt.",
    credit: "Photo credit: Saba Manpower",
  },
  {
    id: "construction", file: "construction.jpg", title: "Construction work",
    description: "A construction worker in a blue hard hat raising a hammer with a road-formwork crew behind him.",
    note: "This represents the construction years; the worker pictured is not claimed to be Kurt.",
    credit: "Photo credit: Go Asia Technology",
  },
  {
    id: "designer-desk", file: "designer-desk.jpg", title: "Design-desk illustration",
    description: "Illustration of a futuristic desk with three monitors showing wireframes, tools and parts, with the Las Vegas skyline and Sphere beyond the window.",
    note: "An illustration, not a photograph of a real desk or office. Restored from the site's own image history for this labelled preview only.",
    credit: "Illustration by Kurt Anthony Morales",
  },
] as const;

function imageSize(image: string): Size {
  const path = join(publicDir, image.slice(1));
  const result = spawnSync("identify", ["-ping", "-format", "%w %h", path], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`Cannot inspect ${image}: ${result.stderr || result.error}`);
  const [width, height] = result.stdout.trim().split(/\s+/).map(Number);
  if (!width || !height) throw new Error(`Invalid dimensions for ${image}`);
  return { width, height };
}

function fromGallery(item: GalleryItem, section: string): Preview {
  if (!/^[a-z0-9-]+$/.test(item.id)) throw new Error(`Unsafe preview ID: ${item.id}`);
  const note = notes[item.id];
  if (!note) throw new Error(`Missing handling note for ${item.id}`);
  const vector = item.file.endsWith(".svg");
  const image = vector ? `/assets/${encodeURIComponent(item.file)}` : `/assets/curated/${item.id}-wide.webp`;
  const small = vector ? undefined : `/assets/curated/${item.id}-small.webp`;
  return {
    id: item.id, section, title: item.title, description: item.description, note,
    image, size: vector ? { width: item.width, height: item.height } : imageSize(image),
    ...(small ? { small, smallSize: imageSize(small) } : {}),
  };
}

const codeImage = "/assets/curated/km-immersive-3d-wide.webp";
const codeSmall = "/assets/curated/km-immersive-3d-small.webp";
const sections: { label: string; items: Preview[] }[] = [
  { label: "Portraits", items: portraits.map((item) => fromGallery(item, "Portraits")) },
  { label: "Print designs", items: printDesigns.map((item) => fromGallery(item, "Print designs")) },
  { label: "Websites", items: websites.map((item) => fromGallery(item, "Websites")) },
  { label: "Experiments and interface studies", items: experiments.map((item) => fromGallery(item, "Experiments and interface studies")) },
  { label: "Learning", items: learning.map((item) => fromGallery(item, "Learning")) },
  { label: "Code-only designs", items: [{
    id: "km-immersive-3d", section: "Code-only designs", title: "Kmwebdesign / immersive 3D",
    description: "A dark homepage hero with DESIGN BEYOND REALITY typography and a cyan-and-magenta 3D ring behind the text.",
    note: "A screenshot rendered locally from Kurt Anthony Morales's immersive homepage code. The pictured controls are artwork, not live booking actions or verified business results.",
    image: codeImage, small: codeSmall, size: imageSize(codeImage), smallSize: imageSize(codeSmall), mobileArtDirection: true,
  }] },
  { label: "Story photos", items: story.map((item) => ({
    id: item.id, section: "Story photos", title: item.title, description: item.description,
    note: item.note, credit: item.credit, image: `/assets/${item.file}`, size: imageSize(`/assets/${item.file}`),
  })) },
];
const all = sections.flatMap((section) => section.items);
if (all.length !== 42 || new Set(all.map((item) => item.id)).size !== all.length) throw new Error("Preview inventory must have 42 unique entries (41 image items and one code-only design)");
if (Object.keys(notes).length !== reviewedAssets.length) throw new Error("Gallery handling notes have drifted from the source inventory");

const css = `:root{color-scheme:light;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1a1a1a;background:#ffffff}
*{box-sizing:border-box}
body{margin:0;min-inline-size:0;line-height:1.6}
.container{inline-size:min(100% - 2rem,960px);margin-inline:auto}
a{color:#2563eb;text-decoration:underline;text-underline-offset:.18em}
a:focus-visible{outline:3px solid #2563eb;outline-offset:4px}
.site-header{background:#f7f7f5;border-block-end:1px solid #e8e8e4;padding-block:1.5rem 2rem}
.site-header .container,.site-footer .container{display:grid;gap:.65rem}
.site-header h1{font-size:clamp(1.8rem,5vw,3rem);line-height:1.15;letter-spacing:-.025em;margin:.3rem 0 .8rem;overflow-wrap:anywhere}
.site-header p{margin:0;max-inline-size:72ch}
.eyebrow{font-weight:700;color:#1a1a1a;font-size:.875rem;letter-spacing:.06em;text-transform:uppercase}
.nav-links{display:flex;flex-wrap:wrap;gap:.4rem 1rem;margin-block:1rem 0}
.nav-links a,.card-link{min-block-size:44px}
.nav-links a{display:inline-flex;align-items:center;padding-inline:.35rem}
main{padding-block:2rem 4rem}
h2{font-size:clamp(1.4rem,3vw,2rem);line-height:1.25;margin:0 0 1rem}
h3{font-size:1.08rem;line-height:1.35;margin:0 0 .4rem}
.image-frame{margin:0;border:1px solid #e8e8e4;border-radius:12px;background:#f7f7f5}
.image-frame picture,.image-frame img{display:block}
.image-frame img{inline-size:100%;block-size:auto;object-fit:contain;border-radius:11px}
.image-frame figcaption{padding:.75rem 1rem;border-block-start:1px solid #e8e8e4;color:#6b6b6b;font-size:.9rem}
.explanation{margin-block:2rem 0;max-inline-size:72ch}
.explanation p{margin-block:0}
.section{margin-block-end:3rem}
.section-heading{border-block-end:1px solid #e8e8e4;margin-block-end:1.25rem;padding-block-end:.5rem}
.cards{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:1rem}
.card-link{display:grid;grid-template-rows:180px auto;block-size:100%;color:#1a1a1a;border:1px solid #e8e8e4;border-radius:12px;background:#ffffff;text-decoration:none}
.card-link:where(:hover,:focus-visible){border-color:#2563eb;text-decoration:underline;text-decoration-thickness:2px}
.card-link img{display:block;inline-size:100%;block-size:180px;object-fit:contain;background:#f7f7f5;border-start-start-radius:11px;border-start-end-radius:11px}
.card-title{display:block;align-self:center;margin:0;padding:1rem;overflow-wrap:anywhere}
.site-footer{border-block-start:1px solid #e8e8e4;padding-block:1.5rem 2rem;color:#6b6b6b}
.site-footer p{margin:0}
@media(max-width:480px){main{padding-block:1.5rem 3rem}.site-header{padding-block:1.25rem 1.5rem}}
`;

function shell(title: string, header: string, body: string): string {
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${escapeHtml(title)} | Kurt Anthony Morales</title>\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n<style>\n${css}</style>\n</head>\n<body>\n${header}\n<main class="container" id="content">\n${body}\n</main>\n<footer class="site-footer"><div class="container"><p>${copyright}</p></div></footer>\n</body>\n</html>\n`;
}

function imageMarkup(item: Preview, thumbnail = false, priority = false): string {
  const image = thumbnail && item.small ? item.small : item.image;
  const size = thumbnail && item.smallSize ? item.smallSize : item.size;
  const img = `<img src="${image}" alt="${escapeHtml(item.description)}" width="${size.width}" height="${size.height}" ${thumbnail && !priority ? "loading=\"lazy\"" : "fetchpriority=\"high\""} decoding="async">`;
  if (thumbnail || !item.small || !item.smallSize) return img;
  if (item.mobileArtDirection) return `<picture><source media="(max-width: 600px)" srcset="${item.small}" width="${item.smallSize.width}" height="${item.smallSize.height}">${img}</picture>`;
  return img.replace(" decoding=", ` srcset="${item.small} ${item.smallSize.width}w, ${item.image} ${item.size.width}w" sizes="(max-width: 992px) calc(100vw - 32px), 960px" decoding=`);
}

function previewCaption(item: Preview): string {
  if (item.credit) return item.credit;
  if (item.section === "Portraits") return "Portrait of Kurt Anthony Morales";
  if (item.section === "Learning") return badgeNote;
  return "Design by Kurt Anthony Morales";
}

function renderPreview(item: Preview): string {
  const header = `<header class="site-header"><div class="container"><p class="eyebrow">${escapeHtml(item.section)} · Portfolio preview</p><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.description)}</p><nav class="nav-links" aria-label="Return links"><a href="/">Back to main site</a><a href="/previews/index.html">All previews</a></nav></div></header>`;
  const caption = previewCaption(item);
  const body = `<figure class="image-frame">${imageMarkup(item)}<figcaption>${escapeHtml(caption)}</figcaption></figure><section class="explanation" aria-labelledby="about-title"><h2 id="about-title">What this is</h2><p>${escapeHtml(item.note)}</p></section>`;
  return shell(`${item.title} — portfolio preview`, header, body);
}

function renderIndex(): string {
  const header = `<header class="site-header"><div class="container"><p class="eyebrow">Kurt Anthony Morales · KM Web Design</p><h1>Portfolio preview gallery</h1><p>Browse Kurt's design previews, story images and course-completion badges. Images and any numbers within them are artwork, not current offers or verified results.</p><nav class="nav-links" aria-label="Return links"><a href="/">Back to main site</a></nav></div></header>`;
  const body = sections.map((section, index) => `<section class="section" aria-labelledby="section-${index}"><div class="section-heading"><h2 id="section-${index}">${escapeHtml(section.label)}</h2></div><ul class="cards">${section.items.map((item, itemIndex) => `<li><a class="card-link" href="/previews/${item.id}.html">${imageMarkup(item, true, index === 0 && itemIndex === 0)}<h3 class="card-title">${escapeHtml(item.title)}</h3></a></li>`).join("")}</ul></section>`).join("\n");
  return shell("Portfolio preview gallery", header, body);
}

mkdirSync(outputDir, { recursive: true });
for (const item of all) {
  writeFileSync(join(outputDir, `${item.id}.html`), renderPreview(item));
}
writeFileSync(join(outputDir, "index.html"), renderIndex());
console.log(`Generated ${all.length} previews and the index in public/previews/`);
