/** Browse-only new construction showcase (SoCal's New Homes). Not Cervantes listings. */

export interface NewHome {
  id: string;
  slug: string;
  title: string;
  area: string;
  fromPrice: number;
  priceHigh?: number;
  /** Rounded public price band — preferred over exact fromPrice on cards/detail */
  priceLabel?: string;
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
  /** Empty until photos are uploaded in CMS */
  image: string;
  gallery: string[];
  videoUrl?: string;
}

/** Old builder-named slugs → current vague slugs (bookmarks / CMS leftovers). */
export const NEW_HOME_SLUG_ALIASES: Record<string, string> = {
  "dahlia-dr-horton-fontana": "gated-north-fontana-townhomes",
  "bloom-brookfield-ontario": "ontario-area-townhomes",
  "serrano-oaks-dr-horton": "jurupa-valley-townhomes",
  "solara-trumark": "south-corona-homes",
};

/**
 * Static seed — CMS `showcase_homes` takes over when published rows exist.
 * Photos stay blank so Aaron uploads zips in Admin → New Homes.
 * Copy is area-level / rounded; no builder or community names.
 */
export const NEW_HOMES: NewHome[] = [
  {
    id: "nh-1",
    slug: "gated-north-fontana-townhomes",
    title: "Gated New Townhomes",
    area: "North Fontana Area",
    fromPrice: 525000,
    priceLabel: "Low-to-mid $500,000s",
    beds: "3–4",
    baths: "2.5",
    sqft: "1,500–1,700",
    style: "Two-story townhomes · 2-car garage",
    blurb:
      "Discover a limited collection of newly built townhomes in a gated North Fontana neighborhood. These modern residences offer open living spaces, contemporary kitchens, flexible bedroom options, and convenient access to shopping, recreation, and major commuter routes. Community amenities may include a pool and outdoor gathering areas.",
    compareToResale: [
      "Newer systems and finishes vs. older inland resale that may need credits after inspection.",
      "Townhome living with shared amenities — trade some privacy for a lower entry than many detached homes nearby.",
      "Confirm HOA and any special taxes with SoCal’s New Homes before you treat the headline price as the full monthly.",
    ],
    whyBuyers:
      "Ask SoCal’s New Homes for availability, incentives, and a private tour. Prices and availability are based on currently published information and can change without notice.",
    hoa: "Confirm current dues with SoCal’s New Homes",
    specialAssessments: "Confirm with SoCal’s New Homes before modeling payment",
    incentives: "Ask SoCal’s New Homes about current incentives",
    verifiedDate: "Nov 20, 2026",
    image: "",
    gallery: [],
  },
  {
    id: "nh-2",
    slug: "ontario-area-townhomes",
    title: "New Ontario Townhomes",
    area: "Ontario Area",
    fromPrice: 510000,
    priceLabel: "Low $500,000s",
    beds: "2–4",
    baths: "2–2.5",
    sqft: "1,000–1,600",
    style: "Modern townhomes · up to 2-car garage",
    blurb:
      "A fresh collection of thoughtfully designed townhomes in a well-connected Ontario neighborhood. Buyers can choose from several efficient floor plans featuring modern finishes, comfortable gathering spaces, and low-maintenance living. Select homes may be available for quicker move-in.",
    compareToResale: [
      "New systems and warranties vs. older Ontario-area resale that can hide deferred maintenance.",
      "Attached product usually means HOA — bake dues into the monthly before you fall in love with a plan.",
      "Resale nearby may negotiate differently on repairs and credits — run both paths with the same payment target.",
    ],
    whyBuyers:
      "Ask SoCal’s New Homes about current homes, financing opportunities, and upcoming releases. Prices and availability can change without notice.",
    hoa: "Confirm current dues with SoCal’s New Homes",
    specialAssessments: "Confirm with SoCal’s New Homes",
    incentives: "Ask SoCal’s New Homes about financing and incentives",
    verifiedDate: "Nov 20, 2026",
    image: "",
    gallery: [],
  },
  {
    id: "nh-3",
    slug: "jurupa-valley-townhomes",
    title: "New Jurupa Valley Townhomes",
    area: "Jurupa Valley Area",
    fromPrice: 510000,
    priceLabel: "Low $500,000s",
    beds: "3–4",
    baths: "2.5",
    sqft: "1,500–1,600",
    style: "Two-story townhomes · attached 2-car garage",
    blurb:
      "Newly built townhomes offering modern comfort in a growing Inland Empire neighborhood. Open-concept interiors, stylish kitchens, flexible living space, and attached garages make these homes a strong option for first-time buyers, growing households, or anyone seeking a low-maintenance new home.",
    compareToResale: [
      "Builder-fresh systems vs. established Jurupa Valley resale that often needs inspection negotiation.",
      "Townhome living with HOA — compare privacy and yard needs against a freestanding resale.",
      "Verify special taxes and HOA with SoCal’s New Homes before you treat the advertised band as the full monthly story.",
    ],
    whyBuyers:
      "Ask SoCal’s New Homes for private details, available homes, and builder incentives. Published figures can change without notice.",
    hoa: "Confirm current dues with SoCal’s New Homes",
    specialAssessments: "Confirm with SoCal’s New Homes",
    incentives: "Ask SoCal’s New Homes about builder incentives",
    verifiedDate: "Nov 20, 2026",
    image: "",
    gallery: [],
  },
  {
    id: "nh-4",
    slug: "south-corona-homes",
    title: "Spacious New Corona Homes",
    area: "South Corona / Temescal Valley Area",
    fromPrice: 775000,
    priceLabel: "Mid-to-upper $700,000s",
    beds: "3–5",
    baths: "≈2.5–5.5",
    sqft: "2,600–4,000+",
    style: "Detached single-family · 2-car garage",
    blurb:
      "An exciting collection of spacious new single-family homes surrounded by the natural scenery of the South Corona area. The available designs include expansive gathering spaces, flexible rooms, modern kitchens, and select single-story opportunities. Convenient freeway access connects residents with employment centers, shopping, dining, and outdoor recreation.",
    compareToResale: [
      "More square footage and newer systems vs. established Corona-area resale with mature landscaping and street feel.",
      "New-build talks often focus on upgrades and closing credits; resale focuses on price and repairs.",
      "Model the full monthly — taxes, insurance, and any HOA — with SoCal’s New Homes before you choose new vs. a renovated resale.",
    ],
    whyBuyers:
      "Ask SoCal’s New Homes about floor plans, upcoming releases, and private appointment availability. Prices and availability can change without notice.",
    hoa: "Confirm with SoCal’s New Homes",
    specialAssessments: "Confirm with SoCal’s New Homes",
    incentives: "Ask SoCal’s New Homes about current incentives",
    verifiedDate: "Nov 20, 2026",
    image: "",
    gallery: [],
  },
  {
    id: "nh-5",
    slug: "jurupa-riverside-new-homes",
    title: "New Homes Near Riverside",
    area: "Jurupa Valley / West Riverside Area",
    fromPrice: 400000,
    priceHigh: 890000,
    priceLabel: "Upper $300,000s to upper $800,000s",
    beds: "1–4",
    baths: "1–3",
    sqft: "≈850–2,900",
    style: "Attached & single-family · garage options",
    blurb:
      "A master-planned stretch of newly built homes on the Jurupa Valley side of the Riverside edge — from efficient attached plans to roomier single-family layouts. Expect modern finishes, flexible bedroom counts, community amenities, and quick links to I-15, SR-60, and SR-91 for workdays and weekend trips into Riverside and beyond.",
    compareToResale: [
      "Brand-new systems and warranties vs. established west-county resale that often needs inspection credits.",
      "Attached and detached options in one community — match privacy and yard needs against older freestanding stock nearby.",
      "Model the full monthly with SoCal’s New Homes (taxes, insurance, HOA, any special assessments) before you pick new vs. renovated resale.",
    ],
    whyBuyers:
      "Contact SoCal’s New Homes for availability, floor plans, incentives, and a private tour. Prices and availability are based on currently published information and can change without notice.",
    hoa: "Confirm current dues with SoCal’s New Homes",
    specialAssessments: "Confirm with SoCal’s New Homes before modeling payment",
    incentives: "Ask SoCal’s New Homes about current incentives",
    verifiedDate: "Nov 24, 2026",
    image: "",
    gallery: [],
  },
];

export const FALLBACK_NEW_HOMES = NEW_HOMES;

export function resolveNewHomeSlug(slug: string): string {
  return NEW_HOME_SLUG_ALIASES[slug] || slug;
}

export function getNewHome(slug: string): NewHome | undefined {
  const resolved = resolveNewHomeSlug(slug);
  return NEW_HOMES.find(
    (h) => h.slug === resolved || h.slug === slug || h.id === slug,
  );
}
