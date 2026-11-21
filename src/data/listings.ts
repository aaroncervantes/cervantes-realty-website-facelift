export interface ListingAgent {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

export interface Listing {
  id: number;
  price: string;
  status: string;
  beds: string;
  baths: string;
  sqft: string;
  type: string;
  address: string;
  cityStateZip: string;
  mls: string;
  image: string;
  gallery: string[];
  badges: string[];
  photosCount: number;
  description: string;
  overview: {
    propertyType: string;
    location: string;
    mlsId: string;
    lastUpdated: string;
    status: string;
  };
  features: {
    interior: {
      bedrooms: string;
      fullBaths: string;
      halfBaths?: string;
      flooring: string;
      appliances: string;
      otherFeatures: string;
    };
    exterior: {
      stories: string;
      garageSpaces: string;
      waterSource: string;
      roof: string;
      airConditioning: string;
      otherFeatures: string;
    };
    details: {
      neighborhood: string;
      architectureStyle: string;
      viewDescription: string;
    };
  };
  agent: ListingAgent;
  /** Optional walkthrough embed URL — only render when present */
  videoUrl?: string;
}

/** Fallback listings when Supabase is not configured */
export const FALLBACK_LISTINGS: Listing[] = [
  {
    id: 3,
    price: "$730,000",
    status: "CLOSED",
    beds: "2",
    baths: "1",
    sqft: "1,234 sqft",
    type: "Single Family",
    address: "549 E Rhea St",
    cityStateZip: "Long Beach, CA 90806",
    mls: "MLS# CV26087570",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
      "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    ],
    badges: ["Represented Buyer"],
    photosCount: 3,
    description:
      "Charming Long Beach single-family residence situated in a quiet, highly desirable neighborhood. Featuring an open layout with abundant natural light, updated kitchen amenities, custom cabinetry, beautiful flooring, and a private back yard perfect for outdoor relaxation and entertaining. Successfully negotiated and closed with competitive buyer representation by Cervantes Realty.",
    overview: {
      propertyType: "Single Family Residence",
      location: "549 E Rhea St, Long Beach, CA 90806",
      mlsId: "CV26087570",
      lastUpdated: "Recently Closed",
      status: "CLOSED",
    },
    features: {
      interior: {
        bedrooms: "2 Bedrooms",
        fullBaths: "1 Full Bath",
        flooring: "Hardwood, Tile",
        appliances:
          "Stainless Steel Range, Dishwasher, Microwave, Refrigerator",
        otherFeatures:
          "Open Floor Concept, Recessed Lighting, Dual Pane Windows, Custom Cabinets",
      },
      exterior: {
        stories: "1 Story",
        garageSpaces: "1 Car Attached Garage",
        waterSource: "Public City Water",
        roof: "Composition Shingle",
        airConditioning: "Central Air & Heating",
        otherFeatures: "Private Enclosed Yard, Covered Patio, Lush Landscaping",
      },
      details: {
        neighborhood: "Central Long Beach",
        architectureStyle: "Traditional Modern",
        viewDescription: "Neighborhood & Garden View",
      },
    },
    agent: {
      name: "Aaron Cervantes",
      role: "Founder - Realtor",
      phone: "(661) 839-4931",
      email: "aaron@cervantesre.com",
      image:
        "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    },
  },
  {
    id: 4,
    price: "$730,000",
    status: "CLOSED",
    beds: "2",
    baths: "1",
    sqft: "1,234 sqft",
    type: "Single Family",
    address: "549 E Rhea St",
    cityStateZip: "Long Beach, CA 90806",
    mls: "MLS# CV26087570",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
      "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    ],
    badges: ["Represented Seller"],
    photosCount: 3,
    description:
      "Represented seller side on 549 E Rhea St. Tailored luxury marketing, high-impact digital showcase, and strategic negotiation tactics resulted in full market value for the home with no closing costs covered by the seller.",
    overview: {
      propertyType: "Single Family Residence",
      location: "549 E Rhea St, Long Beach, CA 90806",
      mlsId: "CV26087570",
      lastUpdated: "Recently Closed",
      status: "CLOSED",
    },
    features: {
      interior: {
        bedrooms: "2 Bedrooms",
        fullBaths: "1 Full Bath",
        flooring: "Hardwood, Tile",
        appliances:
          "Stainless Steel Range, Dishwasher, Microwave, Refrigerator",
        otherFeatures: "Open Floor Concept, Custom Cabinetry, Ample Storage",
      },
      exterior: {
        stories: "1 Story",
        garageSpaces: "1 Car Attached Garage",
        waterSource: "Public City Water",
        roof: "Composition Shingle",
        airConditioning: "Central Air",
        otherFeatures: "Fenced Backyard, Lawn Area",
      },
      details: {
        neighborhood: "Central Long Beach",
        architectureStyle: "Traditional Modern",
        viewDescription: "Neighborhood View",
      },
    },
    agent: {
      name: "Aaron Cervantes",
      role: "Founder - Realtor",
      phone: "(661) 839-4931",
      email: "aaron@cervantesre.com",
      image:
        "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    },
  },
  {
    id: 5,
    price: "$429,999",
    status: "For Sale",
    beds: "3",
    baths: "2",
    sqft: "1,796 sqft",
    type: "Single Family",
    address: "12858 Atsina Rd",
    cityStateZip: "Phelan, CA 92371",
    mls: "MLS# CV26183674",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp",
    gallery: [
      "https://vibe.filesafe.space/1781750305487395093/attachments/30397204-2352-42bc-a0ce-1d14274c5ef3.webp",
      "https://vibe.filesafe.space/1781750305487395093/assets/974bb84d-ee43-4e07-9a17-3177229773d8.png",
      "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    ],
    badges: ["Representing Seller"],
    photosCount: 3,
    description:
      "Incredible opportunity in Phelan! Spacious 3 bedroom, 2 bath single family home featuring 1,796 sqft of living space. Built with modern finishes, generous living areas, expansive lot with ample space for RV parking, outdoor amenities, and sweeping high-desert mountain views. Contact Aaron Cervantes today for private showings and offer submission.",
    overview: {
      propertyType: "Single Family Residence",
      location: "12858 Atsina Rd, Phelan, CA 92371",
      mlsId: "CV26183674",
      lastUpdated: "Active Listing",
      status: "Active / For Sale",
    },
    features: {
      interior: {
        bedrooms: "3 Bedrooms",
        fullBaths: "2 Full Baths",
        flooring: "Laminate Wood, Tile",
        appliances: "Oven/Range, Dishwasher, Built-In Microwave",
        otherFeatures:
          "Spacious Living Room, Dining Area, Primary En-Suite Bedroom with Walk-in Closet",
      },
      exterior: {
        stories: "1 Story",
        garageSpaces: "2 Car Attached Garage",
        waterSource: "Public Water",
        roof: "Tile / Shingle",
        airConditioning: "Central Air & Heat",
        otherFeatures:
          "Large Open Lot, RV Parking, Covered Back Porch, Mountain Panorama",
      },
      details: {
        neighborhood: "Phelan Rural / High Desert",
        architectureStyle: "Ranch Contemporary",
        viewDescription: "Desert & Mountain Views",
      },
    },
    agent: {
      name: "Aaron Cervantes",
      role: "Founder - Realtor",
      phone: "(661) 839-4931",
      email: "aaron@cervantesre.com",
      image:
        "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    },
  },
];
