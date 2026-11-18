import { escapeHtml, hrefAttribute, sectionRail } from "./components.ts";

// Kurt's current projects, synced from his GitHub (kurtmorales-tech) and his
// live sites in November 2026. Keep this list current when new work ships:
// name, what it is in plain words, and a public link where one exists.
type LatestProject = {
  name: string;
  kind: string;
  date: string;
  description: string;
  link?: { href: string; label: string };
};

export const latestProjects: readonly LatestProject[] = [
  {
    name: "Ravfina",
    kind: "Financial platform",
    date: "November 2026",
    description:
      "A treasury and lending platform with wallet, cards, loans and funding, underwriting, FX reconciliation and security views — and a holographic HoloCard interface that tilts toward the pointer while its foil shifts through the spectrum. Wired to Ravfia Lending, it shows live Solana settlement data in the Loans & Funding view.",
  },
  {
    name: "Ravfia Lending & Ravfia Coin (RVCN)",
    kind: "Lending on Solana",
    date: "November 2026",
    description:
      "A lending platform built on Solana, with loans disbursed and repaid in Ravfia Coin (RVCN) — minted on Solana mainnet on November 18, 2026. Five payment playbooks are built into the platform: embedded finance, global payouts, merchant payments, remittances and treasury.",
    link: { href: "https://github.com/kurtmorales-tech/ravfia-token", label: "Ravfia Coin (RVCN) on GitHub" },
  },
  {
    name: "Ravfia Line Striping",
    kind: "Live business site",
    date: "November 2026",
    description:
      "The live site for Kurt's Las Vegas line-striping business, synced in November 2026 with the new holographic gold-foil badge as its brand mark. Services, service areas and free estimates for parking lots across the Las Vegas valley.",
    link: { href: "https://ravfiastrategic0perations.com", label: "Visit Ravfia Line Striping" },
  },
  {
    name: "Ravfia voice agent",
    kind: "Phone agent",
    date: "November 2026",
    description:
      "A phone agent built for Ravfia Line Striping: Asterisk telephony with a Cloudflare Workers AI brain, built to answer business calls and take estimate details from callers.",
  },
  {
    name: "Ravfia Mail",
    kind: "Email system",
    date: "November 2026",
    description:
      "Kurt's own email system for Ravfia, built on Cloudflare — an inbox with routing and AI-drafted replies for the mail@, admin@, billing@ and finance@ mailboxes.",
  },
  {
    name: "KM Web Design — client sites",
    kind: "Web design studio",
    date: "November 2026",
    description:
      "Kurt's web-design studio in full swing: modern, SEO-ready websites for local businesses, built in each client's own branding — with preview homepages built for Las Vegas contractor and home-service companies.",
    link: { href: "https://kmwebdesign.xyz", label: "Visit KM Web Design" },
  },
];

export function latestWork(): string {
  const rows = latestProjects
    .map(
      (project, index) => `<article class="latest-row"><div class="latest-number">${String(index + 1).padStart(2, "0")}</div><div><p class="latest-kind">${escapeHtml(project.kind)} / ${escapeHtml(project.date)}</p><h3>${escapeHtml(project.name)}</h3><p class="latest-desc">${escapeHtml(project.description)}</p></div>${project.link ? `<a class="latest-link" href="${hrefAttribute(project.link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.link.label)} <span aria-hidden="true">↗</span></a>` : ""}</article>`,
    )
    .join("");
  return `<section class="latest" id="latest-work" aria-labelledby="latest-title"><div class="container">${sectionRail("LATEST WORK", "SYNCED NOVEMBER 2026")}<div class="latest-head"><h2 id="latest-title">THE NEWEST<br><em>BUILDS.</em></h2><p>What Kurt is building right now in Las Vegas — synced from his GitHub and his live sites, November 2026.</p></div><div class="latest-list">${rows}</div></div></section>`;
}
