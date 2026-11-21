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
 * Copy stays area-level and rounded so visitors contact Devante — not a Google trail to a builder page.
 * No community names, builders, or street addresses on the public site.
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
      "Confirm HOA and any special taxes with Devante before you treat the headline price as the full monthly.",
    ],
    whyBuyers:
      "Contact Devante for availability, incentives, and a private tour. Prices and availability are based on currently published information and can change without notice.",
    hoa: "Confirm current dues with Devante",
    specialAssessments: "Confirm with Devante before modeling payment",
    incentives: "Ask Devante about current incentives",
    verifiedDate: "Nov 20, 2026",
    image:
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/01-0fc2566a8b5ab0bd.jpg",
    gallery: [
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/01-0fc2566a8b5ab0bd.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/02-2c3b1f52b21543f9.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/03-2ec0f51fbc98f137.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/04-4a315186a815d210.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/05-4dc2f3f9b86c1520.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/06-4e79323d09b7f546.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/07-9c74ca6909bdae45.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/08-16ae2031ab0c5d5f.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/09-18bc250389edb2fa.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/10-34a6133ee3a70202.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/11-34d043bea3ad5b00.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/12-36d8552a5f1ba321.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/13-47aed0aaf515d3b2.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/14-85feed70f57d88ea.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/15-86cd11792f7b842c.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/16-86d1357405a10a53.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/17-89dd06b3c7f0afe1.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/18-94a2f701b6bfe447.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/19-150fb69429260323.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/20-214b2dd82fe4feba.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/21-233d0ae9f3469c41.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/22-0459a7a302f44a7c.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/23-539ac5acd2aab893.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/24-650f3ca382b5a8d6.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/25-716de8db9cd7d94e.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/26-0899d51cc25be84a.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/27-990c441ad04fac2f.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/28-3695ad4a2501b824.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/29-6566fb4b38c9df1a.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/30-09213b63276b72ad.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/31-65439b49c08428e5.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/32-0884233c429a3357.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/33-949342d6126781f0.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/34-3796824174a1d283.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/35-ac18f57abdde2969.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/36-ad3991464772aed4.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/37-bee09a2139e1a472.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/38-c18ae00c911b46c1.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/39-c87a7bae1c87c1ff.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/40-c601be8a3f1f60ad.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/41-cd628069fb6826a8.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/42-d72e0a83541d17ad.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/43-db2566afd2928347.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/44-e2e6c21442373309.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/45-e9f26265bb5fed73.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/46-ece98205642375a1.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/47-f9d25c19c19b9915.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/48-f85b963a7af234ae.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/49-f6899288ecfa353d.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/gated-north-fontana-townhomes/50-fcd41190ff8b67bb.jpg",
    ],
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
      "Ask Devante about current homes, financing opportunities, and upcoming releases. Prices and availability can change without notice.",
    hoa: "Confirm current dues with Devante",
    specialAssessments: "Confirm with Devante",
    incentives: "Ask Devante about financing and incentives",
    verifiedDate: "Nov 20, 2026",
    image:
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/01-6af4a73fb57e1d56.jpg",
    gallery: [
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/01-6af4a73fb57e1d56.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/02-7aae14e5ad7ecc66.webp",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/03-15e49e8f184dae00.webp",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/04-b3a7ef28e4bbb66e.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/05-c6cccdcdd73a38f3.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/06-ce43c7a2e53757a5.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/07-ceae4d87d3527d38.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/ontario-area-townhomes/08-ecbea8f666aa4404.webp",
    ],
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
      "Verify special taxes and HOA with Devante before you treat the advertised band as the full monthly story.",
    ],
    whyBuyers:
      "Contact Devante for private details, available homes, and builder incentives. Published figures can change without notice.",
    hoa: "Confirm current dues with Devante",
    specialAssessments: "Confirm with Devante",
    incentives: "Ask Devante about builder incentives",
    verifiedDate: "Nov 20, 2026",
    image:
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/01-0b64d9e67cba2267.jpg",
    gallery: [
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/01-0b64d9e67cba2267.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/02-0e9695730426ae71.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/03-1c9a18772f5332da.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/04-1dc5581e9e544489.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/05-2f5de486d5e029d9.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/06-3f19e9a6d3bc6845.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/07-4c7fafcc08225a1e.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/08-4f32042f0f1aa631.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/09-6abf10a22aa72634.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/10-8b37eada5b4f9240.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/11-8e9958627ab35a00.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/12-9d3d05f90d61b79c.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/13-019c5632f9f091dc.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/14-72b8e495d9beb194.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/15-191fd0d1fd91bf7f.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/16-223e49cec119794d.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/17-325ae102ac391d74.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/18-19835be06d11c60e.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/19-64366f1d62524db9.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/20-a64b42b689355965.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/21-b09e2d937e26bdf7.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/22-ba9eea97a6d473ce.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/23-cac233d7717f9513.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/24-cbfaf71f8845d4de.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/25-d3f28ce3b5e06f33.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/26-d6d8c05f404aa40f.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/27-d76b408d18b26f21.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/28-d29950b68339812f.jpg",
      "https://pdlecpunupzyqreocjnn.supabase.co/storage/v1/object/public/listing-media/showcase/jurupa-valley-townhomes/29-ea789f8dc3a3c62b.jpg",
    ],
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
      "Model the full monthly — taxes, insurance, and any HOA — with Devante before you choose new vs. a renovated resale.",
    ],
    whyBuyers:
      "Ask Devante about floor plans, upcoming releases, and private appointment availability. Prices and availability can change without notice.",
    hoa: "Confirm with Devante",
    specialAssessments: "Confirm with Devante",
    incentives: "Ask Devante about current incentives",
    verifiedDate: "Nov 20, 2026",
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    ],
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
