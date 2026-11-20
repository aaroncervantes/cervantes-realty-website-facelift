export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  result: string;
  area: string;
  image: string;
  body: string[];
}

export const STORIES: Story[] = [
  {
    slug: "rhea-st",
    title: "549 E Rhea St",
    subtitle: "Long Beach — buyer & seller representation",
    price: "$730,000",
    result: "Closed with competitive strategy on both sides of the table",
    area: "Central Long Beach",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/293f82cb-43f7-4ff0-80f5-d18cdf464dab.png",
    body: [
      "This Long Beach single-family sat in a quiet pocket buyers overlook until they walk it. Open light, updated kitchen, private yard — the kind of home that photographs soft and shows stronger in person.",
      "On the buy side, we structured terms that stood out without reckless overpaying. On the sell side, marketing and negotiation protected net — full market value with no seller-paid closing costs in the represented-seller closing.",
      "That’s Concierge in practice: clear comps, clear offers, clear communication — then keys.",
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
