export interface Market {
  slug: string;
  name: string;
  region: string;
  median: string;
  vibe: string;
  samplePrice: number;
  bullets: string[];
  image: string;
}

export const MARKETS: Market[] = [
  {
    slug: "long-beach",
    name: "Long Beach",
    region: "Los Angeles County",
    median: "~$750K–$900K depending on pocket",
    vibe: "Coastal-adjacent urban with character streets, freeway access, and pockets that still feel neighborhood-first.",
    samplePrice: 730000,
    bullets: [
      "Walkable strips and quiet residential pockets in the same city.",
      "Strong demand keeps well-prepped homes moving.",
      "Pair a payment estimate with school and commute priorities early.",
    ],
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
  },
  {
    slug: "high-desert",
    name: "High Desert",
    region: "San Bernardino County",
    median: "Often the value play for space",
    vibe: "Bigger lots, newer builds, mountain views — trade coastal premium for square footage and sky.",
    samplePrice: 450000,
    bullets: [
      "Payment goes further — underwrite insurance and commute honestly.",
      "New construction and resale both active; compare warranties vs. character.",
      "Great for buyers priced out of the basin who still want ownership.",
    ],
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp",
  },
  {
    slug: "la-county-pocket",
    name: "Southeast LA County",
    region: "Los Angeles County",
    median: "Pocket-dependent — know the block",
    vibe: "Established mid-century streets, strong family demand, and competition when inventory is thin.",
    samplePrice: 825000,
    bullets: [
      "Comps by street matter more than citywide medians.",
      "First-time buyers win with pre-approval and clean terms.",
      "We help you separate Zestimate noise from real closings.",
    ],
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
  },
  {
    slug: "inland-empire",
    name: "Inland Empire",
    region: "Riverside / San Bernardino",
    median: "New tracts + resale mix",
    vibe: "Master plans, single-story living, and payment-driven decisions — where SoCal’s New Homes content often points.",
    samplePrice: 589000,
    bullets: [
      "Watch HOA + Mello-Roos on new vs. older resale payments.",
      "Single-story plans are a perennial tour request.",
      "We keep the comparison honest: warranty vs. lot vs. monthly.",
    ],
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
  },
];

export function getMarket(slug: string): Market | undefined {
  return MARKETS.find((m) => m.slug === slug);
}
