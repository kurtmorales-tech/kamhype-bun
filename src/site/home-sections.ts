import { journey } from "../data/journey.ts";
import { escapeHtml, actionLink } from "./components.ts";

const tools = [
  { name: "Rust", kind: "Learning focus", icon: "rust", text: "Exploring systems programming, ownership and memory safety." },
  { name: "Cybersecurity", kind: "Learning focus", icon: "shield", text: "Learning how systems fail, how to reason about risk, and how to build defensively." },
  { name: "Local AI agents", kind: "Learning companion", icon: "agent", text: "Working with AI agents locally while learning, investigating and building." },
  { name: "Bun", kind: "This website", icon: "terminal", text: "The runtime behind this site’s server, build tools and tests." },
  { name: "TypeScript", kind: "This website", icon: "code", text: "Typed components and server-side rendering, without a client-side framework." },
  { name: "HTML & CSS", kind: "This website", icon: "web", text: "Semantic pages, responsive layouts and progressively enhanced motion." },
] as const;

function icon(kind: typeof tools[number]["icon"]): string {
  const shapes = {
    rust: '<circle cx="24" cy="24" r="16"/><path d="M24 3v5m0 32v5M3 24h5m32 0h5M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4M18 33V15h7a5 5 0 0 1 0 10h-7m7 0 7 8"/>',
    shield: '<path d="M24 5 8 11v12c0 10 16 20 16 20s16-10 16-20V11Z"/><path d="m16 24 5 5 11-12"/>',
    agent: '<rect x="8" y="13" width="32" height="25" rx="6"/><path d="M24 13V5M3 23h5m32 0h5M17 30h14"/><circle cx="17" cy="22" r="1"/><circle cx="31" cy="22" r="1"/>',
    terminal: '<rect x="4" y="8" width="40" height="32" rx="4"/><path d="m12 17 7 7-7 7m13 0h10"/>',
    code: '<path d="m15 13-11 11 11 11m18-22 11 11-11 11M28 8l-8 32"/>',
    web: '<rect x="4" y="7" width="40" height="34" rx="3"/><path d="M4 17h40M18 17v24M10 12h1m5 0h1m5 0h1"/>',
  };
  return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shapes[kind]}</svg>`;
}

export function learningFocus(): string {
  return `<section class="home-focus" id="learning-focus" aria-labelledby="focus-title"><div class="container focus-layout"><div><p class="info-kicker">RIGHT NOW / THE NEXT CHAPTER</p><h2 id="focus-title">Learning to build.<br>Learning to protect.</h2></div><div><p class="focus-lead">${escapeHtml(journey.learningFocus.summary)}</p><p>This is a learning journey, not a claim of expertise. The goal is to understand the systems behind the screen—not just the interface on top.</p>${actionLink("/curiosity#learning-record", "Explore the learning", "light-text")}</div></div></section>`;
}

export function technologyStrip(): string {
  return `<section class="home-tools" aria-labelledby="tools-title"><div class="container"><div class="tools-heading"><div><p class="info-kicker">THE TOOLBOX / STUDY & BUILD</p><h2 id="tools-title">What’s on the desk.</h2><p id="tools-help">Learning tools and the technology behind this site. Swipe, scroll, or use the arrow buttons to explore.</p></div><div class="tools-controls" hidden><button type="button" data-tool-step="-1" aria-label="Previous technology cards" aria-controls="technology-track">←</button><button type="button" data-tool-step="1" aria-label="Next technology cards" aria-controls="technology-track">→</button></div></div><ul class="technology-track" id="technology-track" tabindex="0" aria-label="Technology and learning tools" aria-describedby="tools-help">${tools.map(tool=>`<li class="technology-card"><span class="technology-icon">${icon(tool.icon)}</span><p class="technology-kind">${escapeHtml(tool.kind)}</p><h3>${escapeHtml(tool.name)}</h3><p>${escapeHtml(tool.text)}</p></li>`).join("")}</ul><p class="tools-note">Learning focus ≠ professional certification. Icons are illustrative; no vendor endorsement is implied.</p></div></section>`;
}

export function testimonials(): string {
  return `<section class="home-testimonials" aria-labelledby="testimonials-title"><div class="container testimonial-layout"><div><p class="info-kicker">TESTIMONIALS / IN PEOPLE’S WORDS</p><h2 id="testimonials-title">Good work.<br>Real feedback.</h2></div><div class="testimonial-empty"><span class="testimonial-mark" aria-hidden="true">“</span><h3>Have we built something together?</h3><p>No testimonials published yet. This space is reserved for genuine feedback, shared with permission.</p>${actionLink(journey.links.instagram, "Share your experience", "light-text")}</div></div></section>`;
}
