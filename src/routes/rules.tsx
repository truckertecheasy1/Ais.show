import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ENTRY_FEE, FAQ } from "@/lib/content";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Rules & FAQ — THE AIs" },
      { name: "description", content: "Entry rules, the $25 entry fee, eligibility and frequently asked questions for THE AIs." },
      { property: "og:title", content: "Rules & FAQ — THE AIs" },
      { property: "og:description", content: "Everything you need to know before entering the AI Creator Awards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rules,
});

const rules = [
  `Entry fee: $${ENTRY_FEE} per submission, per category.`,
  "AI must be central to the creation of the work. Human direction, editing and curation are allowed and must be disclosed.",
  "Entrants must be 18+ and hold the rights to all submitted material, including any licensed assets.",
  "Work must have been first published within the eligibility window announced when entries open.",
  "No content depicting real people without consent, and no hateful or illegal content.",
  `Prize floor ($35,000) is a target — ${t.prizeNote.toLowerCase()}`,
  "Judging combines an expert jury with public signals; Most Viral is measured on verified reach.",
];

function Rules() {
  return (
    <>
      <PageHeader eyebrow="The fine print" title="Rules & FAQ" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
        <section>
          <h2 className="text-3xl">Entry rules</h2>
          <ol className="mt-6 space-y-4">
            {rules.map((r, i) => (
              <li key={i} className="flex gap-4 text-sm text-muted-foreground">
                <span className="font-display text-2xl font-semibold text-foreground">{i + 1}</span><span className="pt-1.5">{r}</span>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-3xl">FAQ</h2>
          <Accordion type="single" collapsible className="mt-4">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
