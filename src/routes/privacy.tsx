import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — THE AIs" },
      { name: "description", content: "How THE AIs collects, uses and protects the information you share through our forms and podcast vote." },
      { property: "og:title", content: "Privacy Policy — THE AIs" },
      { property: "og:description", content: "How THE AIs handles your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  ["What we collect", "Only what you type into our forms: name, email, company, selected category, sponsorship interest, message and your podcast host vote."],
  ["Why we collect it", "To notify you about entries and the gala, answer sponsor inquiries, and count one podcast vote per email. We never sell your data."],
  ["Votes", "Public results show only totals per host. Individual emails are never displayed."],
  ["Retention", "We keep your information until the end of the current awards season or until you ask us to delete it."],
  ["Your rights", "Write to hello@ais.show to access, correct or delete your information."],
];

function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy">Last updated November 2026.</PageHeader>
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
