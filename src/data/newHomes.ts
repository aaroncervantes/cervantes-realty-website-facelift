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

/**
 * Static seed — CMS `showcase_homes` takes over when published rows exist.
 * Pricing/specs are builder-facing snapshots for education only; confirm with the builder.
 * No street addresses. Browse-only — not Cervantes listings.
 */
export const NEW_HOMES: NewHome[] = [
  {
    id: "nh-1",
    slug: "dahlia-dr-horton-fontana",
    title: "Dahlia by D.R. Horton",
    area: "Fontana · Inland Empire",
    fromPrice: 527000,
    priceHigh: 587000,
    beds: "3–4",
    baths: "2.5",
    sqft: "1,584–1,705",
    style: "Two-story townhome",
    blurb:
      "Dahlia at Sierra Vista — gated two-story townhomes in Fontana with open great rooms and a community pool. Featured for awareness through SoCal’s New Homes; confirm pricing and availability with D.R. Horton.",
    compareToResale: [
      "Newer systems and builder finish packages vs. older Fontana / IE resale that may need credits after inspection.",
      "Townhome HOA and shared amenities trade some privacy for a lower entry than many detached resales nearby.",
      "Ask about Mello-Roos / CFD before you compare the monthly to a similar resale payment.",
    ],
    whyBuyers:
      "Buyers who want a newer townhome footprint inland — without jumping to detached pricing — often shortlist Dahlia, then run the full monthly against a nearby resale.",
    hoa: "Expect HOA — confirm current dues with the builder",
    specialAssessments: "Possible special taxes — verify before modeling payment",
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
    slug: "bloom-brookfield-ontario",
    title: "Bloom by Brookfield",
    area: "Ontario · Inland Empire",
    fromPrice: 531000,
    priceHigh: 650000,
    beds: "2–4",
    baths: "2+",
    sqft: "1,074–1,569",
    style: "Attached / townhome",
    blurb:
      "Bloom at Edenglen in Ontario — Brookfield Residential new construction with a flexible bed count for first-time and move-up buyers. Browse-only showcase; go direct to Brookfield for tours and incentives.",
    compareToResale: [
      "Newer construction and warranties vs. older Ontario resale that can hide deferred maintenance.",
      "Attached product usually means HOA — bake dues into the monthly before you fall in love with the plan.",
      "Resale detached nearby may cost more upfront but negotiate differently on repairs and credits.",
    ],
    whyBuyers:
      "A practical Ontario entry when you want new systems and a lock-and-leave feel — then compare the same payment target against a resale on the next street over.",
    hoa: "Expect HOA — dues vary; confirm with Brookfield",
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
    slug: "serrano-oaks-dr-horton",
    title: "Serrano Oaks by D.R. Horton",
    area: "Jurupa Valley · Inland Empire",
    fromPrice: 500000,
    priceHigh: 555000,
    beds: "3–4",
    baths: "2.5",
    sqft: "1,502–1,600",
    style: "Two-story townhome",
    blurb:
      "Serrano Oaks — D.R. Horton townhomes in Jurupa Valley sized for first homes and growing households. Featured for market awareness only; not a Cervantes listing and not open for inquire on this site.",
    compareToResale: [
      "Builder warranties and newer roofs/HVAC vs. Jurupa / Pedley resale that often needs inspection negotiation.",
      "Townhome living with HOA amenities — compare privacy and yard needs against a freestanding resale.",
      "Verify special taxes and HOA before you treat the advertised price as the full monthly story.",
    ],
    whyBuyers:
      "Strong when you want a newer two-story townhome inland at a payment you can underwrite — then tour a comparable resale with the same number in mind.",
    hoa: "Expect HOA — confirm current dues with D.R. Horton",
    specialAssessments: "Possible special taxes — verify with the builder",
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
    slug: "solara-trumark",
    title: "Solara by Trumark",
    area: "Corona · Inland Empire",
    fromPrice: 761000,
    priceHigh: 980000,
    beds: "4+",
    baths: "3+",
    sqft: "2,679–4,065",
    style: "Single-family",
    blurb:
      "Solara by Trumark Homes — larger single-family plans in the Corona area for buyers who want space and newer construction. Showcase only; confirm plans, pricing, and incentives with Trumark.",
    compareToResale: [
      "More square footage and newer systems vs. established Corona resale with mature landscaping and street feel.",
      "New-build negotiations often focus on upgrades and closing credits; resale focuses on price and repairs.",
      "Model the full monthly — taxes, insurance, and any HOA — before you choose new vs. a renovated resale.",
    ],
    whyBuyers:
      "Buyers who need room and prefer new construction often start at Solara, then pressure-test the payment against a renovated resale in the same commute band.",
    hoa: NV,
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
