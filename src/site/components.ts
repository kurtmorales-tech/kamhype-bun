import { journey } from "../data/journey.ts";
import { pageUrl, siteUrl } from "./seo.ts";

export type PagePath = "/" | "/story" | "/work" | "/curiosity" | "/now";

type Chapter = { path: Exclude<PagePath, "/">; label: string; summary: string; image: string; alt: string; width: number; height: number };

export const chapters: readonly Chapter[] = [
  { path: "/story", label: "The story", summary: "Where it started. What changed in March 2022.", image: "/assets/tagum.jpg", alt: "Aerial view of Tagum City", width: 1200, height: 720 },
  { path: "/work", label: "The work", summary: "Construction, painting, events, and the game beyond the job.", image: "/assets/construction.jpg", alt: "Workers on a construction site", width: 1024, height: 684 },
  { path: "/curiosity", label: "The curiosity", summary: "Computers, DIY, design, and the next thing to learn.", image: "/assets/kmwebdesign-agency.webp", alt: "KM Web Design homepage concept", width: 1200, height: 833 },
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
  return `<div class="chapter-index"><div class="chapter-view-controls" role="group" aria-label="Chapter view"><span>View</span><button type="button" data-chapter-view="grid" aria-pressed="true" aria-controls="chapter-list">Grid</button><button type="button" data-chapter-view="list" aria-pressed="false" aria-controls="chapter-list">List</button></div><ol class="chapter-list" id="chapter-list" role="list">${chapters.map((chapter, index) => `<li>
    <a class="chapter-card" href="${chapter.path}"><span class="chapter-card-number">0${index + 1} / 04</span><span class="chapter-card-photo"><img src="${chapter.image}" alt="" width="${chapter.width}" height="${chapter.height}" loading="lazy" decoding="async"></span><span class="chapter-card-copy"><strong>${escapeHtml(chapter.label)}</strong> <span>${escapeHtml(chapter.summary)}</span></span><span class="chapter-card-arrow" aria-hidden="true">↗</span></a>
  </li>`).join("")}</ol></div>`;
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
  return `<header class="site-header"><div class="container header-inner"><a class="brand" href="/"><span class="brand-symbol" aria-hidden="true">K<span>↗</span></span><span class="brand-name">KAMHYPE<span class="brand-period">.</span></span></a>${navigation(current, false)}${navigation(current, true)}<a class="header-link" href="/now#connect">Let's connect <span aria-hidden="true">↗</span></a></div></header>`;
}

const GITHUB_ICON_PATH = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
const INSTAGRAM_ICON_PATH = "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
const socialIcon = (path: string): string => `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;

function siteFooter(): string {
  return `<footer class="site-footer"><div class="container"><div class="footer-main"><a class="footer-brand" href="/">KAMHYPE<span>.</span></a><p>${escapeHtml(journey.name)}<br>${escapeHtml(journey.origin.city)}, Philippines \u2192 Las Vegas, USA</p><a href="#top">Back to top \u2191</a></div><div class="footer-nav"><nav aria-label="Explore this site"><p class="footer-heading">Explore</p><ul class="footer-links"><li><a href="/">Home \u2014 the story so far</a></li><li><a href="/story">The Story \u2014 Tagum City to Las Vegas</a></li><li><a href="/work">Work \u2014 hands-on experience</a></li><li><a href="/curiosity">Curiosity \u2014 learning record &amp; experiments</a></li><li><a href="/now">Today \u2014 latest work &amp; current projects</a></li></ul></nav><nav aria-label="Kurt's businesses and code"><p class="footer-heading">Businesses &amp; Code</p><ul class="footer-links"><li><a href="${journey.links.studio}">KM Web Design \u2014 websites for small businesses</a></li><li><a href="${journey.links.business}">Ravfia Line Striping \u2014 Ravfia Strategic Operations</a></li><li><a href="${journey.links.github}">Kurt Morales on GitHub \u2014 projects &amp; code</a></li></ul></nav><div><p class="footer-heading">Follow Kamhype</p><ul class="social-links"><li><a href="${journey.links.github}" target="_blank" rel="noopener" aria-label="Kurt Morales on GitHub">${socialIcon(GITHUB_ICON_PATH)}</a></li><li><a href="${journey.links.instagram}" target="_blank" rel="noopener" aria-label="Kamhype on Instagram">${socialIcon(INSTAGRAM_ICON_PATH)}</a></li></ul></div></div><div class="footer-bottom"><span>BUILT WITH BUN / TYPESCRIPT / CURIOSITY</span><span>\u00a9 ${new Date().getFullYear()} ${escapeHtml(journey.name.toUpperCase())}</span></div></div></footer>`;
}

export function pageShell(options: { current: PagePath | null; title: string; description: string; body: string; notFound?: boolean }): string {
  const { current, title, description, body, notFound = false } = options;
  const lightSurface = current === "/" || current === "/story" || current === "/curiosity" || notFound;
  const canonical = current ? pageUrl(current) : null;
  const socialImage = canonical ? siteUrl("/social-card.png") : null;
  const twitterCard = socialImage ? "summary_large_image" : "summary";
  const personUrl = canonical ? pageUrl("/") : undefined;
  const metadata = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    notFound ? '<meta name="robots" content="noindex">' : "",
    '<meta property="og:type" content="website"><meta property="og:site_name" content="Kamhype">',
    `<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">`,
    canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:url" content="${escapeHtml(canonical)}">` : "",
    socialImage ? `<meta property="og:image" content="${escapeHtml(socialImage)}"><meta property="og:image:alt" content="Kamhype — Kurt Anthony Morales, from Tagum City to Las Vegas"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">` : "",
    `<meta name="twitter:card" content="${twitterCard}"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}">`,
    socialImage ? `<meta name="twitter:image" content="${escapeHtml(socialImage)}">` : "",
  ].join("");
  const structuredData = current ? `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical ?? undefined,
    about: { "@type": "Person", name: journey.name, alternateName: journey.alias, url: personUrl },
  }).replace(/</g, "\\u003c")}</script>` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="${lightSurface ? "#f2f3f5" : "#101918"}">${metadata}<title>${escapeHtml(title)}</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/pages.css">${current === "/" ? '<link rel="stylesheet" href="/home.css">' : ""}<script src="/main.js" defer></script>${structuredData}</head><body id="top"${current === "/" ? ' class="home-surface"' : ""}><a class="skip-link" href="#content">Skip to content</a>${siteHeader(current)}<main id="content" tabindex="-1">${body}</main>${siteFooter()}</body></html>`;
}
