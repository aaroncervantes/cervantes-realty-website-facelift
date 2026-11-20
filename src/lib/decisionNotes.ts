import type { Listing } from "@/data/listings";

export interface DecisionNote {
  label: string;
  body: string;
}

/** Build buyer notes only from verified listing fields — never invent facts. */
export function buildDecisionNotes(listing: Listing): DecisionNote[] {
  const notes: DecisionNote[] = [];
  const { features, overview, type } = listing;

  if (features.details.neighborhood) {
    notes.push({
      label: "Neighborhood context",
      body: `Located in ${features.details.neighborhood}. Confirm schools, noise, and street feel on your tour — listing data doesn’t replace a walk of the block.`,
    });
  }

  if (features.details.architectureStyle) {
    const stories = features.exterior.stories
      ? ` · ${features.exterior.stories}`
      : "";
    notes.push({
      label: "Layout & architecture",
      body: `${features.details.architectureStyle}${stories}. Note flow between living spaces and whether the plan fits how you actually live.`,
    });
  }

  if (features.exterior.garageSpaces) {
    notes.push({
      label: "Parking",
      body: `${features.exterior.garageSpaces}. Verify driveway depth, street parking rules, and any HOA vehicle restrictions during your tour.`,
    });
  }

  if (features.exterior.airConditioning) {
    notes.push({
      label: "Climate systems",
      body: `${features.exterior.airConditioning}. Ask age/service history at inspection — listing descriptions rarely include remaining useful life.`,
    });
  }

  if (features.exterior.roof) {
    notes.push({
      label: "Roof",
      body: `${features.exterior.roof}. Roof age and remaining life should be confirmed by inspection, not assumed from the listing text.`,
    });
  }

  const featureBits = [
    features.interior.otherFeatures,
    features.exterior.otherFeatures,
  ]
    .filter(Boolean)
    .join(" · ");
  if (featureBits) {
    notes.push({
      label: "Features worth seeing in person",
      body: `${featureBits}. Photos compress scale — prioritize these on the walkthrough.`,
    });
  }

  if (type || overview.propertyType) {
    notes.push({
      label: "Property type",
      body: `${overview.propertyType || type}. Confirm HOA, CC&Rs, and any special assessments with escrow/title if applicable — not always stated on the public listing.`,
    });
  }

  if (features.details.viewDescription) {
    notes.push({
      label: "View / outlook",
      body: `${features.details.viewDescription}. Views change with season, neighbors, and future construction — verify from the rooms that matter to you.`,
    });
  }

  notes.push({
    label: "Taxes & ongoing costs",
    body: "Property tax, possible supplemental tax after purchase, insurance, and utilities aren’t fully knowable from the listing alone. We help you estimate before you write.",
  });

  return notes;
}
