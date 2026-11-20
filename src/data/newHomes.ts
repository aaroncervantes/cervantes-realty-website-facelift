/** Browse-only new construction showcase (SoCal's New Homes). Not Cervantes listings. */

export interface NewHome {
  id: string;
  slug: string;
  title: string;
  area: string;
  fromPrice: number;
  beds: string;
  baths: string;
  sqft: string;
  style: string;
  blurb: string;
  image: string;
  gallery: string[];
}

export const NEW_HOMES: NewHome[] = [
  {
    id: "nh-1",
    slug: "inland-empire-single-story",
    title: "Single-story plans inland",
    area: "Inland Empire",
    fromPrice: 589000,
    beds: "3–4",
    baths: "2–3",
    sqft: "1,600–2,200",
    style: "Ranch contemporary",
    blurb:
      "Low-maintenance single-story footprints with open kitchens and outdoor rooms — the kind of new builds we see families touring most often inland.",
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
    beds: "2–3",
    baths: "2.5–3",
    sqft: "1,400–1,900",
    style: "Modern townhome",
    blurb:
      "Attached new construction with rooftop decks and lock-and-leave living — popular with first-time buyers who want newer systems without a full single-family price.",
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
    beds: "3–5",
    baths: "2–3",
    sqft: "1,700–2,600",
    style: "Desert contemporary",
    blurb:
      "Larger lots and newer construction for the payment — a common SoCal’s New Homes post theme when buyers want space without coastal pricing.",
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
    beds: "3–4",
    baths: "3–3.5",
    sqft: "1,800–2,400",
    style: "Paired / duet",
    blurb:
      "New paired homes with private yards — often the bridge between a condo and a detached resale when inventory is tight.",
    image:
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
    ],
  },
];

export function getNewHome(slug: string): NewHome | undefined {
  return NEW_HOMES.find((h) => h.slug === slug || h.id === slug);
}
