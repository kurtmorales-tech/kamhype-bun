import { journey } from "../data/journey.ts";

export type PagePath = "/" | "/story" | "/work" | "/curiosity" | "/now";

type Chapter = { path: Exclude<PagePath, "/">; label: string; summary: string; image: string; alt: string; width: number; height: number };

export const chapters: readonly Chapter[] = [
  { path: "/story", label: "The story", summary: "Where it started. What changed in March 2022.", image: "/assets/tagum.jpg", alt: "Aerial view of Tagum City", width: 1200, height: 720 },
  { path: "/work", label: "The work", summary: "Construction, painting, events, and the game beyond the job.", image: "/assets/construction.jpg", alt: "Workers on a construction site", width: 1024, height: 684 },
  { path: "/curiosity", label: "The curiosity", summary: "Computers, DIY, design, and the next thing to learn.", image: "/assets/designer-desk.jpg", alt: "Illustrated computer workbench", width: 2352, height: 1008 },
  { path: "/now", label: "Today", summary: "The design work and the life still being built.", image: "/assets/vegas.jpg", alt: "Las Vegas skyline at blue hour", width: 1344, height: 768 },
];

/** Escape text and attribute values; only authored templates are passed as markup. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export function hrefAttribute(href: string): string {
  if (href.startsWith("//") || (!href.startsWith("/") && !href.startsWith("#") && !href.startsWith("https://"))) throw new Error("Unsupported link destination");
  return escapeHtml(href);
}

export function actionLink(href: string, label: string, variant: "lime" | "dark" | "light-text" | "dark-text" = "lime"): string {
  const classes = { lime: "button button-acid", dark: "button button-dark", "light-text": "text-link", "dark-text": "closing-link" } as const;
  const external = href.startsWith("https://") ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="${classes[variant]}" href="${hrefAttribute(href)}"${external}>${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}

export function sectionRail(left: string, right: string): string {
  return `<div class="section-rail"><span>${escapeHtml(left)}</span><span>${escapeHtml(right)}</span></div>`;
}

export function photoFigure(options: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  className: "origin-image" | "play-item" | "now-visual" | "feature-image";
  priority?: boolean;
}): string {
  const { src, alt, width, height, caption, className, priority = false } = options;
  return `<figure class="${className} image-reveal"><img src="${hrefAttribute(src)}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}><figcaption>${caption}</figcaption></figure>`;
}

export function chapterIndex(): string {
  return `<ol class="chapter-list">${chapters.map((chapter, index) => `<li>
    <a class="chapter-card" href="${chapter.path}"><span class="chapter-card-number">0${index + 1}</span><span class="chapter-card-copy"><strong>${escapeHtml(chapter.label)}</strong><span>${escapeHtml(chapter.summary)}</span></span><span class="chapter-card-photo"><img src="${chapter.image}" alt="" width="${chapter.width}" height="${chapter.height}" loading="lazy" decoding="async"></span><span class="chapter-card-arrow" aria-hidden="true">↗</span></a>
  </li>`).join("")}</ol>`;
}

export function chapterPager(current: Exclude<PagePath, "/">): string {
  const index = chapters.findIndex((chapter) => chapter.path === current);
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const back = previous ?? { path: "/", label: "Home" };
  const forward = next ?? { path: "/", label: "Home" };
  return `<nav class="chapter-pager container" aria-label="Chapter navigation"><a href="${back.path}" class="pager-prev"><span>← PREVIOUS CHAPTER</span><strong>${escapeHtml(back.label)}</strong></a><a href="${forward.path}" class="pager-next"><span>NEXT CHAPTER →</span><strong>${escapeHtml(forward.label)}</strong></a></nav>`;
}

export function chapterHero(options: {
  chapter: string;
  title: string;
  emphasis: string;
  description: string;
  variant: "story" | "work" | "curiosity" | "now";
  image?: { src: string; alt: string; width: number; height: number };
  action: { href: string; label: string };
}): string {
  const { chapter, title, emphasis, description, variant, image, action } = options;
  return `<section class="chapter-hero chapter-hero--${variant}" aria-labelledby="chapter-title"><div class="hero-grid" aria-hidden="true"></div>
    <div class="container chapter-hero-layout"><div class="chapter-hero-copy"><p class="hero-intro"><span class="intro-line" aria-hidden="true"></span>${escapeHtml(chapter)}</p><h1 id="chapter-title">${escapeHtml(title)}<br><em>${escapeHtml(emphasis)}</em></h1><p class="chapter-hero-deck">${escapeHtml(description)}</p>${actionLink(action.href, action.label)}</div>
    ${image ? `<figure class="chapter-hero-media"><img src="${hrefAttribute(image.src)}" alt="${escapeHtml(image.alt)}" width="${image.width}" height="${image.height}" fetchpriority="high"></figure>` : '<div class="chapter-hero-graphic" aria-hidden="true"><span>?</span><i></i></div>'}</div>
    <div class="container chapter-hero-bottom"><span>${escapeHtml(journey.name.toUpperCase())} / ${escapeHtml(journey.alias.toUpperCase())}</span><span>${escapeHtml(chapter.toUpperCase())}</span></div>
  </section>`;
}

function navigation(current: PagePath | null, mobile: boolean): string {
  const items: { path: PagePath; label: string }[] = [{ path: "/", label: "Home" }, ...chapters.map((chapter) => ({ path: chapter.path, label: chapter.label }))];
  const links = items.map(({ path, label }) => `<a href="${path}"${path === current ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`).join("");
  return mobile ? `<details class="mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile">${links}<a href="/now#connect">Let's connect ↗</a></nav></details>` : `<nav class="main-nav" aria-label="Primary">${links}</nav>`;
}

function siteHeader(current: PagePath | null): string {
  return `<header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Kamhype — home"><span class="brand-symbol" aria-hidden="true">K<span>↗</span></span><span class="brand-name">KAMHYPE<span class="brand-period">.</span></span></a>${navigation(current, false)}${navigation(current, true)}<a class="header-link" href="/now#connect">Let's connect <span aria-hidden="true">↗</span></a></div></header>`;
}

function siteFooter(): string {
  return `<footer class="site-footer"><div class="container"><div class="footer-main"><a class="footer-brand" href="/">KAMHYPE<span>.</span></a><p>${escapeHtml(journey.name)}<br>${escapeHtml(journey.origin.city)}, Philippines → Las Vegas, USA</p><a href="#top">Back to top ↑</a></div><div class="footer-bottom"><span>BUILT WITH BUN / TYPESCRIPT / CURIOSITY</span><span>© ${new Date().getFullYear()} ${escapeHtml(journey.name.toUpperCase())}</span></div><p class="photo-note">Site imagery illustrates places, work, and interests; it does not depict Kurt. Original repository photo credits: Property Report Philippines (Tagum), Lenna for Nevada (Las Vegas), Go Asia Technology (construction), Saba Manpower (painter), Vieclam Philippine (basketball), Marcus Scigliano Photography (billiards). Design-desk artwork was made for this site.</p></div></footer>`;
}

export function pageShell(options: { current: PagePath | null; title: string; description: string; body: string; notFound?: boolean }): string {
  const { current, title, description, body, notFound = false } = options;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#101918"><meta name="description" content="${escapeHtml(description)}">${notFound ? '<meta name="robots" content="noindex">' : ""}<meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><title>${escapeHtml(title)}</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/pages.css"><script src="/main.js" defer></script></head><body id="top"><a class="skip-link" href="#content">Skip to content</a>${siteHeader(current)}<main id="content" tabindex="-1">${body}</main>${siteFooter()}</body></html>`;
}
