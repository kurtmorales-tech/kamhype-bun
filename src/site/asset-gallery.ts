import { escapeHtml } from "./components.ts";

type Asset = { id: string; file: string; title: string; description: string; width: number; height: number };
const asset = (id: string, file: string, title: string, description: string, width: number, height: number): Asset => ({ id, file, title, description, width, height });

// Placement is based on visual review, not filenames alone. Screenshots establish
// what a design looks like, not authorship, client relationships or business results.
export const portraits = [
  asset("portrait-casual", "me2.png", "A personal introduction", "Portrait in a cream cardigan against a dark studio-style background.", 1024, 1536),
  asset("portrait-formal", "me.png", "The next chapter", "Portrait in a gray suit and pink shirt against a dark studio-style background.", 1024, 1536),
];
export const printDesigns = [
  asset("cleaning-vector", "ravfia-cleaning-front.svg", "Cleaning identity / vector artwork", "Flat black-and-yellow card artwork with a green leaf mark; a scalable counterpart to the printed mockups.", 1125, 675),
  asset("bin-wash-cards", "BinCleaningBusinessCardMockup.png", "Ravfia Bin Wash", "Business-card mockup: black and yellow identity, bin imagery and service icons.", 1536, 1024),
  asset("cleaning-cards", "RavfiaCleaning.png", "Ravfia Cleaning Services", "A two-sided business-card presentation with a shared black-and-yellow identity.", 1448, 1086),
  asset("bin-wash-flyer", "Flyer.png", "From card to campaign", "A tall promotional flyer combining service information, imagery and a clear call to action. Prices and contact details are part of the supplied artwork, not current offers on this site.", 1024, 1536),
];
export const websites = [
  asset("km-agency", "kmwebdesign-agency.webp", "KM Web Design / agency", "Dark blue and violet homepage with a strategy-audit panel and a strong typographic introduction.", 1200, 833),
  asset("km-freelance", "kmwebdesign-freelance.webp", "KM Web Design / freelance", "A quieter teal-and-ink direction focused on websites for small businesses.", 1200, 833),
  asset("restaurant-studio", "kurtmorales.webp", "A restaurant-focused direction", "Warm editorial typography and an orange accent frame a restaurant-web-design offer.", 1200, 833),
  asset("manila-bbq", "manilabbq.webp", "Manila BBQ / introduction", "Cream and brick-red restaurant page with menu, ordering and location entry points.", 1200, 833),
  asset("manila-food", "screenshot-2026-08-13_22-08-06.png", "Food as the focal point", "A separate restaurant layout pairs oversized food photography with an editorial headline.", 3788, 1966),
  asset("ravfia-operations", "ravfia-strategic.webp", "Ravfia Strategic Operations", "A restrained blue-and-white service homepage built around contracting and accountability.", 1200, 917),
  asset("ravfia-striping", "ravfia-striping.webp", "Ravfia / striping", "A pale, typographic service page with yellow wayfinding accents and a scope-first message.", 1200, 833),
  asset("bin-wash-web", "Screenshot_20251204_011104.png", "Bin wash / website", "A dark service-site treatment that carries the cleaning identity into a booking-oriented page.", 1905, 1034),
  asset("portfolio-dark", "kurt_morales_website.jpeg", "Personal portfolio / dark", "A minimal centered introduction with project and contact entry points.", 2063, 1343),
  asset("portfolio-orange", "screenshot-2026-05-12_01-30-23.png", "Personal portfolio / orange", "An alternate portfolio direction with warm accents and a split-screen introduction.", 2340, 1622),
];
export const experiments = [
  asset("secure-pass", "darkmode.jpeg", "Password-generator interface", "A dark utility interface with password settings and a strength indicator. This is a design screenshot, not a functioning tool here.", 1427, 898),
  asset("tube-ideas", "tubeideas.webp", "YouTube idea interface", "A dark idea-generation interface with controls for shaping a video concept.", 1200, 833),
  asset("viral-predict", "screenshot-2026-05-12_14-39-12.png", "Viral Predict / interface study", "A light, orange-accented concept with a video-input field. No predictive capability is claimed by displaying this screenshot.", 2934, 1544),
  asset("starter-landing", "landing-page.png", "Starter-template landing page", "A multi-tenant Next.js starter-template screen; presented as interface reference, not an original product claim.", 2676, 1636),
  asset("dashboard", "dashboard-overview.png", "Dashboard / overview", "A template-style dashboard with chart, navigation and example metrics. The displayed revenue and activity are not claimed business results.", 2422, 1526),
  asset("account-settings", "account-settings.png", "Dashboard / account settings", "A companion settings screen with profile and team-management controls and sample account data.", 1398, 1072),
  asset("team-switcher", "team-switcher.png", "Dashboard / team switching", "A close-up of the team selector and its account-navigation states.", 874, 554),
  asset("ravfia-coin", "ravfiacoin.png", "Ravfia Coin / graphic", "A gold-and-violet promotional graphic. Shown only as visual design, not a token endorsement or verification of the claims in the artwork.", 1254, 1254),
  asset("type-poster", "printing-money-is-fun.png", "Dimensional typography", "An emerald typographic poster exploring depth, lighting and a bold central message.", 2560, 1440),
];
export const learning = [
  asset("cloud-infrastructure", "screenshot-2026-10-26_09-09-12-chromium.png", "Modernize Infrastructure and Applications with Google Cloud", "Infrastructure and application modernization.", 1331, 1022),
  asset("cloud-ai", "screenshot-2026-10-26_09-09-26-chromium.png", "Innovating with Google Cloud Artificial Intelligence", "Artificial intelligence and cloud applications.", 1472, 1010),
  asset("cloud-data", "screenshot-2026-10-26_09-09-33-chromium.png", "Exploring Data Transformation with Google Cloud", "Data transformation and cloud foundations.", 1525, 969),
  asset("cloud-digital", "screenshot-2026-10-26_09-09-42-chromium.png", "Digital Transformation with Google Cloud", "Digital transformation concepts.", 1250, 972),
  asset("agent-adk", "screenshot-2026-10-26_09-09-49-chromium.png", "Build Your First Agent with Agent Development Kit (ADK)", "Agent development with ADK.", 1408, 1002),
  asset("enterprise-agents", "screenshot-2026-10-26_09-09-56-chromium.png", "Enterprise Agents and Use Cases", "Agent applications in enterprise contexts.", 1400, 1004),
  asset("agent-fundamentals", "screenshot-2026-10-26_09-10-05-chromium.png", "Agent Fundamentals", "Foundational agent concepts.", 1370, 1008),
  asset("cloud-engineer-prep", "screenshot-2026-10-26_09-10-11-chromium.png", "Preparing for Your Associate Cloud Engineering", "Preparation coursework; not evidence of passing the certification exam.", 1357, 993),
  asset("generative-mlops", "screenshot-2026-10-26_09-10-19-chromium.png", "Machine Learning Operations (MLOps) for Generative AI", "Operations for generative AI systems.", 1448, 957),
];
export const reviewedAssets = [...portraits, ...printDesigns, ...websites, ...experiments, ...learning];

export function assetImage(item: Asset): string {
  if (item.file.endsWith(".svg")) return `<img src="/assets/${encodeURIComponent(item.file)}" alt="${escapeHtml(item.description)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async">`;
  const width = Math.min(item.width, 960);
  return `<img src="/assets/curated/${item.id}-wide.webp" srcset="/assets/curated/${item.id}-small.webp 480w, /assets/curated/${item.id}-wide.webp ${width}w" sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 640px" width="${item.width}" height="${item.height}" alt="${escapeHtml(item.description)}" loading="lazy" decoding="async">`;
}

export function assetGallery(id: string, eyebrow: string, title: string, introduction: string, items: readonly Asset[], compact = false): string {
  return `<section class="asset-gallery${compact ? " asset-gallery--badges" : ""}" id="${id}" aria-labelledby="${id}-title"><div class="container"><header class="asset-gallery-heading"><p class="info-kicker">${escapeHtml(eyebrow)}</p><h2 id="${id}-title">${escapeHtml(title)}</h2><p>${escapeHtml(introduction)}</p></header><div class="asset-grid">${items.map((item) => `<figure class="asset-entry"><a class="asset-preview" href="/assets/${encodeURIComponent(item.file)}" aria-label="View full-size image: ${escapeHtml(item.title)}">${assetImage(item)}</a><figcaption><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><a class="asset-original" href="/assets/${encodeURIComponent(item.file)}">View full-size image <span aria-hidden="true">↗</span></a></figcaption></figure>`).join("")}</div></div></section>`;
}

export function portraitSection(which: 0 | 1): string {
  const item = portraits[which];
  if (!item) throw new Error("Missing portrait asset");
  return `<section class="portrait-section" aria-labelledby="portrait-${which}-title"><div class="container portrait-layout"><figure>${assetImage(item)}<figcaption>PERSONAL IMAGE / ${which === 0 ? "CASUAL PORTRAIT" : "FORMAL PORTRAIT"}</figcaption></figure><div><p class="info-kicker">${which === 0 ? "BEHIND THE NAME" : "AFTER THE CROSSING"}</p><h2 id="portrait-${which}-title">${which === 0 ? "More than a place on a map." : "Still the same drive."}</h2><p>${which === 0 ? "Kamhype is the personal story of Kurt Anthony Morales: hands-on work, a move across the world, and an appetite for learning that keeps taking new forms." : "The move to Las Vegas marks a new chapter, not the end of the story. Work, design and learning continue through the pages that follow."}</p><a class="asset-original" href="${which === 0 ? "/story" : "/now"}">${which === 0 ? "Read the story" : "Explore the current work"} <span aria-hidden="true">↗</span></a></div></div></section>`;
}
