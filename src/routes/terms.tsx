import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — THE AIs" },
      { name: "description", content: "Terms for using the THE AIs website, voting in the podcast host poll and registering interest." },
      { property: "og:title", content: "Terms of Use — THE AIs" },
      { property: "og:description", content: "The rules for using ais.show." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

const sections = [
  ["Using the site", "You may browse, join the list, vote and send inquiries. Do not submit false information or automate submissions."],
  ["Podcast vote", "One vote per email address. Votes from automated or duplicate accounts may be removed."],
  ["Prizes", "The $35,000 prize floor is a target, guaranteed once our anchor sponsor and 300 entries are confirmed. Full entry terms are published in the Rules."],
  ["Entries", "Entries are not open yet. The entry fee will be $25 per submission."],
  ["Contact", "Questions: hello@ais.show."],
];

function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use">Last updated November 2026.</PageHeader>
      <div className="mx-auto max-w-3xl space-y-8 px-5">
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-display text-2xl font-semibold">{h}</h2>
            <p className="mt-2 text-muted-foreground">{p}</p>
          </section>
        ))}
      </div>
    </>
  );
}
