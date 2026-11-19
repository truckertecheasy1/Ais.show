export const GALA_DATE_ISO = "2027-12-11T20:00:00-07:00"; // 20:00 Denver (MST)

export const PRIZES = { film: 10000, viral: 5000, category: 2500, categoryCount: 8 };
export const PRIZE_TOTAL = PRIZES.film + PRIZES.viral + PRIZES.category * PRIZES.categoryCount;
export const ENTRY_FEE = 25;
// Flip to true when submissions open: shows paid checkout on /enter and lets the server create sessions.
export const ENTRIES_OPEN = false;
export const ENTRY_PRICE_ID = "entry_fee";

export type Category = { slug: string; name: string; blurb: string; prize: number; badge?: "TOP" | "NEW" };

export const CATEGORIES: Category[] = [
  { slug: "film", name: "Film of the Year", blurb: "The definitive AI-made film of the year.", prize: 10000, badge: "TOP" },
  { slug: "viral", name: "Most Viral", blurb: "The piece the whole internet couldn't stop sharing.", prize: 5000, badge: "TOP" },
  { slug: "short", name: "Best Short", blurb: "Under ten minutes. Unforgettable.", prize: 2500 },
  { slug: "music-video", name: "Best Music Video", blurb: "Sound and vision, generated.", prize: 2500, badge: "NEW" },
  { slug: "animation", name: "Best Animation", blurb: "Motion beyond the keyframe.", prize: 2500 },
  { slug: "commercial", name: "Best Commercial", blurb: "Thirty seconds that sell a world.", prize: 2500 },
  { slug: "character", name: "Best AI Character", blurb: "A performer born of prompts.", prize: 2500, badge: "NEW" },
  { slug: "visual", name: "Best Visual Effects", blurb: "Spectacle that rewrites the frame.", prize: 2500 },
  { slug: "storytelling", name: "Best Storytelling", blurb: "Narrative craft, human heart.", prize: 2500 },
  { slug: "newcomer", name: "Breakthrough Creator", blurb: "The first-timer who stole the show.", prize: 2500, badge: "NEW" },
];

export type Host = { id: string; name: string; persona: string; pos: [number, number] };
export const HOSTS: Host[] = [
  { id: "aria-nova", name: "Aria Nova", persona: "Warm, witty, red-carpet ready.", pos: [0, 0] },
  { id: "kai-sterling", name: "Kai Sterling", persona: "Deep voice, sharp critic.", pos: [1, 0] },
  { id: "lumen-vale", name: "Lumen Vale", persona: "Cool, precise, effortlessly chic.", pos: [2, 0] },
  { id: "orion-cross", name: "Orion Cross", persona: "Seasoned anchor with a dry wit.", pos: [0, 1] },
  { id: "sable-wren", name: "Sable Wren", persona: "Bold storyteller, fearless questions.", pos: [1, 1] },
  { id: "vega-lux", name: "Vega Lux", persona: "Tech-native, calm and curious.", pos: [2, 1] },
];

export const SPONSOR_TIERS = [
  { id: "anchor", name: "Anchor Sponsor", price: "US$ 25,000+", perks: ["Presenting credit: “THE AIs presented by …”", "Unlocks the guaranteed prize floor", "Gala opening segment", "Year-round brand placement"] },
  { id: "platinum", name: "Platinum", price: "US$ 15,000+", perks: ["Film of the Year co-presenter", "Logo on all ceremony broadcasts", "Podcast integration"] },
  { id: "silver", name: "Silver", price: "US$ 7,500+", perks: ["Most Viral segment partner", "Logo on site and stream", "Social campaign"] },
  { id: "category", name: "Category Partner", price: "US$ 2,500+", perks: ["Name a category award", "On-stage mention", "Winner announcement credit"] },
] as const;

export const FAQ = [
  { q: "When do entries open?", a: "Entries open soon. Join the list to be notified the moment submissions go live." },
  { q: "How much does it cost to enter?", a: `Each entry costs $${ENTRY_FEE}. The fee helps fund the prize pool and judging.` },
  { q: "Is the prize pool guaranteed?", a: "The $35,000 prize floor is a target. It becomes guaranteed once our anchor sponsor and 300 entries are confirmed." },
  { q: "Where is the gala?", a: "100% online. Grand Gala on December 11, 2027 at 20:00 Denver time. Black tie encouraged — even on camera." },
  { q: "Can work be partly human-made?", a: "Yes. AI must be central to the creation; human direction, editing and curation are welcome and must be disclosed." },
  { q: "How many ceremonies are there?", a: "Three ceremonies lead the season, culminating in the Grand Gala." },
];
