/** Browse-only new construction showcase (SoCal's New Homes). Not Cervantes listings. */

export interface NewHome {
  id: string;
  slug: string;
  title: string;
  area: string;
  fromPrice: number;
  priceHigh?: number;
  beds: string;
  baths: string;
  sqft: string;
  style: string;
  blurb: string;
  compareToResale: [string, string, string];
  whyBuyers: string;
  hoa: string;
  specialAssessments: string;
  incentives: string;
  verifiedDate: string;
  image: string;
  gallery: string[];
  videoUrl?: string;
}

const NV = "Not yet verified";

/** Static seed — CMS `showcase_homes` takes over when published rows exist. */
export const NEW_HOMES: NewHome[] = [
  {
    id: "nh-1",
    slug: "inland-empire-single-story",
    title: "Single-story plans inland",
    area: "Inland Empire",
    fromPrice: 589000,
    priceHigh: 720000,
    beds: "3–4",
    baths: "2–3",
    sqft: "1,600–2,200",
    style: "Ranch contemporary",
    blurb:
      "Low-maintenance single-story footprints with open kitchens and outdoor rooms — the kind of new builds we see families touring most often inland.",
    compareToResale: [
      "Builder warranties can cover systems early — resale often needs inspection credits instead.",
      "HOA dues are common on new tracts; bake them into the monthly before you fall in love.",
      "Mello-Roos or CFD taxes can add real dollars — ask before you compare to a similar resale payment.",
    ],
    whyBuyers:
      "Buyers who want single-level living and newer systems without coastal pricing often start here — then compare a similar resale payment with HOA and special taxes included.",
    hoa: "Common on master-planned tracts — confirm current dues with the builder",
    specialAssessments: "Mello-Roos / CFD possible — verify before modeling payment",
    incentives: NV,
    verifiedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    ],
  },
  {
    id: "nh-2",
    slug: "oc-townhome-clusters",
    title: "Townhome clusters near the coast",
    area: "Orange County",
    fromPrice: 725000,
    priceHigh: 890000,
    beds: "2–3",
    baths: "2.5–3",
    sqft: "1,400–1,900",
    style: "Modern townhome",
    blurb:
      "Attached new construction with rooftop decks and lock-and-leave living — popular with first-time buyers who want newer systems without a full single-family price.",
    compareToResale: [
      "Newer roofs, HVAC, and insulation vs. mid-century resale repairs.",
      "Shared walls and HOA rules trade privacy for lower entry price.",
      "Resale detached nearby may cost more upfront but skip Mello-Roos — run both payments.",
    ],
    whyBuyers:
      "A bridge between condo convenience and more space — strong when the monthly (HOA included) still fits after coastal premiums.",
    hoa: "Expect HOA — dues vary by community",
    specialAssessments: NV,
    incentives: NV,
    verifiedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp",
    ],
  },
  {
    id: "nh-3",
    slug: "high-desert-value-builds",
    title: "High-desert value builds",
    area: "High Desert",
    fromPrice: 449000,
    priceHigh: 575000,
    beds: "3–5",
    baths: "2–3",
    sqft: "1,700–2,600",
    style: "Desert contemporary",
    blurb:
      "Larger lots and newer construction for the payment — a common SoCal’s New Homes theme when buyers want space without coastal pricing.",
    compareToResale: [
      "You often get more square footage new — vs. character and established landscaping on resale.",
      "Commute and insurance (wind/fire) can swing the ‘cheap’ payment — underwrite the lifestyle.",
      "Resale may negotiate harder on price; new builds negotiate on upgrades and closing credits.",
    ],
    whyBuyers:
      "Space and newer construction for the dollar — best when commute and insurance are modeled honestly alongside the note.",
    hoa: NV,
    specialAssessments: NV,
    incentives: NV,
    verifiedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
    ],
  },
  {
    id: "nh-4",
    slug: "la-county-paired-homes",
    title: "Paired homes in LA County",
    area: "Los Angeles County",
    fromPrice: 820000,
    priceHigh: 980000,
    beds: "3–4",
    baths: "3–3.5",
    sqft: "1,800–2,400",
    style: "Paired / duet",
    blurb:
      "New paired homes with private yards — often the bridge between a condo and a detached resale when inventory is tight.",
    compareToResale: [
      "Yard + new systems without full lot maintenance of a 1950s single-family.",
      "Check shared-drive / party-wall rules vs. a freestanding resale.",
      "Resale might win on school pocket or street feel — tour both with the same payment target.",
    ],
    whyBuyers:
      "When detached resale inventory is thin, paired new homes can deliver yard + systems — if party-wall rules still feel like home.",
    hoa: "Often yes on paired/duet products — confirm",
    specialAssessments: NV,
    incentives: NV,
    verifiedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    ],
  },
];

export const FALLBACK_NEW_HOMES = NEW_HOMES;

export function getNewHome(slug: string): NewHome | undefined {
  return NEW_HOMES.find((h) => h.slug === slug || h.id === slug);
}
