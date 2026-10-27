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
  ambition: {
    title: "A different beginning for the next generation.",
    summary: "Kurt wants to build businesses, retire early and travel—but the deeper goal is to give his future child a more secure beginning than the one he had.",
    numberOneGoal: {
      title: "His goal: build wealth and America's biggest parking lot line striping company.",
      status: "This is a future vision, not a claim of current wealth, contracts, crews or national market position.",
    },
    support: "Kurt describes his entrepreneurial ambitions as a path he has had to believe in without the support he hoped for. Wanting to build a business, retire early and travel can feel lonely when the people around him do not share that vision. He is choosing to keep learning and working toward it anyway.",
    family: "His ambition is personal. He does not want his future child to grow up with the hardship and uncertainty he experienced. He wants to offer stability, room to learn and the freedom to make choices without survival deciding everything first. He cannot rewrite his own childhood, but he wants to help shape a different one for the next generation.",
    freedom: "For Kurt, entrepreneurship is a way to work toward that freedom: to own what he builds, have more control over his time, retire early and see more of the world. Travel is part of the dream, but so is having time to be present for the family he hopes to build.",
    planLabel: "$10 million",
    planStatus: "A personal ambition—not current wealth or a promised outcome.",
    plan: "He has a $10 million plan and is dedicating himself to building toward it. That number describes his ambition, not money he has already earned. Today, the work is studying, learning Rust and cybersecurity, working with local AI agents and developing the skills to turn ideas into businesses. There is no guaranteed timeline. There is a decision to keep showing up and doing the work.",
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
