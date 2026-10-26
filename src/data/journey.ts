// Structured facts for the Kamhype site, used by the rendered pages and /api/journey.
// Keep editorial prose in src/site/pages.ts consistent with these facts.

export const journey = {
  name: "Kurt Anthony Morales",
  alias: "Kamhype",
  origin: {
    city: "Tagum City",
    province: "Davao del Norte",
    island: "Mindanao",
    country: "Philippines",
    raisedBy: "Grandparents",
    family: "Poor family, broken family",
    schooling: "Grade 7–10 only — did not finish high school, did not go through K-12",
  },
  move: {
    to: "Las Vegas, Nevada, United States",
    date: "March 2022",
  },
  work: ["Construction Laborer", "Paint Laborer", "Event Organizing"],
  sports: [
    { name: "Billiards", note: "Trophy-winning player" },
    { name: "Basketball", note: "Trophy-winning player" },
  ],
  now: [
    "Web Designer & Frontend Developer",
    "Founder, KM Web Design",
    "Manager, Ravfia Strategic Operations LLC",
  ],
  learningFocus: {
    topics: ["Rust", "Cybersecurity"],
    companion: "Local AI agents",
    summary: "Kamhype is focused on learning Rust and cybersecurity, working with AI agents running locally as part of his learning process.",
  },
  trait: {
    title: "Curious about everything",
    detail:
      "His #1 problem and #1 strength: curiosity about everything — mostly computers and DIY. Always studying, always picking up new skills, always hustling for his life and dreams.",
  },
  links: {
    instagram: "https://www.instagram.com/kamhypeofficial",
    studio: "https://kmwebdesign.xyz",
    business: "https://ravfiastrategic0perations.com",
  },
} as const;

export type Journey = typeof journey;
