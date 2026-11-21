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
      "549 E Rhea St sat in a quiet Long Beach pocket buyers overlook until they walk it. Open light, updated kitchen, private yard — soft in photos, stronger in person.",
      "We represented both sides of the table. Buyer terms stood out without reckless overpaying. Seller marketing and negotiation protected net — competitive close with no seller-paid closing costs on the represented-seller side.",
      "That’s Concierge in practice: live comps, clear offers, same-day updates — then keys. One deal, both lenses, no mystery.",
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
