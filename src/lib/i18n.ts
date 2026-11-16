// i18n-ready copy. Add new locales as additional keys with the same shape.
export const messages = {
  en: {
    nav: { home: "Home", categories: "Categories", prizes: "Prizes & Gala", sponsors: "Sponsors", podcast: "Podcast", enter: "Enter", rules: "Rules & FAQ" },
    hero: {
      eyebrow: "The AI Creator Awards · ais.show",
      title: "THE AIs",
      tagline: "Not another feed to scroll. A night to be part of.",
      ctaJoin: "Join the list",
      ctaSponsor: "Become a sponsor",
    },
    stats: { categories: "Categories", prize: "Prize floor target", ceremonies: "Ceremonies" },
    banner: { title: "$10,000 Film of the Year", meta: "Grand Gala · Black Tie · Dec 11, 2027" },
    countdown: { title: "Curtain rises in", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec" },
    prizeNote: "Guaranteed once our anchor sponsor and 300 entries are confirmed.",
    entriesSoon: "Entries open soon",
    hostess: "A.I.S. — your hostess for the night",
    forms: {
      name: "Name", email: "Email", submit: "Submit", sending: "Sending…",
      success: "You're on the list. See you on the carpet.",
      error: "Something went wrong. Please try again.",
    },
    footer: { rights: "THE AIs — The AI Creator Awards. All rights reserved." },
  },
} as const;

export type Locale = keyof typeof messages;
export const defaultLocale: Locale = "en";
export const t = messages[defaultLocale];
