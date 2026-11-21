export interface Market {
  slug: string;
  name: string;
  region: string;
  median: string;
  vibe: string;
  samplePrice: number;
  bullets: string[];
  localPerspective: string[];
  reviewedDate: string;
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
    localPerspective: [
      "I read Long Beach by pocket first — craftsman streets, mid-century cul-de-sacs, and townhome strips don’t price the same way, even with the same city label.",
      "Clients who want coastal energy and still a real neighborhood usually win here; if you need more square footage for the payment, we look inland next.",
      "Tour at the hour you’d actually drive the 710 / 405 / 91. Evening traffic changes the feel of a house more than the listing photos will.",
      "Resale still owns the character story. New product is thinner — we only compare it when warranties, HOA, and lot actually beat the street you’d rather live on.",
      "Most detached resales skip HOA. Still model California supplemental tax before you fall in love with the monthly.",
    ],
    reviewedDate: "Nov 20, 2026",
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
    localPerspective: [
      "Out here the product is space — ranch and contemporary footprints on lots the basin can’t match for the payment.",
      "Quiet and sky are real. So are longer errands. We talk through that trade before anyone drives two hours for an open house.",
      "A ‘cheap payment’ that eats your week in commuting isn’t cheap. Stress-test the drive the same day you run the calculator.",
      "New builds win on systems and square footage; resale often wins on landscaping and negotiation room. We put both on one sheet.",
      "Wind and fire insurance can move the monthly as much as rate. Get quotes before you lock a strategy.",
    ],
    reviewedDate: "Nov 20, 2026",
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
    localPerspective: [
      "Southeast LA County is street-by-street. Mid-century single-family dominates, but floor plans and lot size swing hard a block apart.",
      "Family demand means weekends matter. Pre-approval and clean terms beat waiting for ‘the market to calm down.’",
      "Freeway access is a lifestyle feature — convenience and noise trade off. We walk that with you on tour, not after you write.",
      "Paired or new product shows up in pockets; most of the fight is still for the right resale. Comps by street beat citywide medians.",
      "HOA is less common on detached stock. We still verify assessments and tax implications before you celebrate the list price.",
    ],
    reviewedDate: "Nov 20, 2026",
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
    localPerspective: [
      "Master-planned new construction sits next to older tracts — two different monthly stories on the same freeway corridor.",
      "Buyers here usually filter for single-story and a yard. Payment is the gate; lifestyle is the reason to stay.",
      "Commute toward OC/LA is the lifestyle tax. Model time, not just miles, before you pick a community.",
      "This is where Cervantes × SoCal’s New Homes earns its keep — warranties and incentives vs. established streets, on one comparison.",
      "Never fall for a ‘from’ price without Mello-Roos/CFD and HOA on the sheet. We ask that first.",
    ],
    reviewedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
  },
];

export function getMarket(slug: string): Market | undefined {
  return MARKETS.find((m) => m.slug === slug);
}
