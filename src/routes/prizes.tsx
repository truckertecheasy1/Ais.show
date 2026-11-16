import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { Countdown } from "@/components/site/Countdown";
import { PRIZES, PRIZE_TOTAL } from "@/lib/content";
import { t } from "@/lib/i18n";
import gala from "@/assets/gala.jpg";

export const Route = createFileRoute("/prizes")({
  head: () => ({
    meta: [
      { title: "Prizes & Gala — THE AIs" },
      { name: "description", content: "A $35,000 prize floor target and a black-tie online Grand Gala on Dec 11, 2027 at 20:00 Denver time." },
      { property: "og:title", content: "Prizes & Grand Gala — THE AIs" },
      { property: "og:description", content: "Film of the Year $10,000, Most Viral $5,000, eight categories at $2,500." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Prizes,
});

function Prizes() {
  const rows = [
    ["Film of the Year", PRIZES.film],
    ["Most Viral", PRIZES.viral],
    [`${PRIZES.categoryCount} categories × $${PRIZES.category.toLocaleString()}`, PRIZES.category * PRIZES.categoryCount],
  ] as const;
  return (
    <>
      <PageHeader eyebrow="Prize floor target" title="Prizes & Gala">
        <span className="font-semibold text-foreground">${PRIZE_TOTAL.toLocaleString()}</span> — {t.prizeNote.toLowerCase()}
      </PageHeader>
      <section className="mx-auto max-w-4xl px-5">
        <ul className="divide-y divide-border rounded-xl border border-border bg-card shadow-card">
          {rows.map(([l, v]) => (
            <li key={l} className="flex items-baseline justify-between gap-4 p-5 md:p-6">
              <span className="font-display text-2xl font-medium md:text-3xl">{l}</span>
              <span className="font-display text-3xl font-semibold text-silver-gradient md:text-4xl">${v.toLocaleString()}</span>
            </li>
          ))}
          <li className="flex items-baseline justify-between p-5 md:p-6">
            <span className="eyebrow">Total target</span>
            <span className="font-display text-4xl font-bold">${PRIZE_TOTAL.toLocaleString()}</span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">The prize floor is a target: {t.prizeNote.toLowerCase()}</p>
      </section>

      <section className="relative mx-auto mt-16 max-w-7xl overflow-hidden rounded-xl px-5">
        <div className="relative overflow-hidden rounded-xl border border-border shadow-card">
          <img src={gala} alt="The Grand Gala stage" loading="lazy" width={1920} height={1088} className="h-[60vh] w-full object-cover" />
          <div className="absolute inset-0 bg-fade-r" />
          <div className="absolute inset-0 flex flex-col justify-center gap-6 p-8 md:p-14">
            <p className="eyebrow">Grand Gala</p>
            <h2 className="text-5xl font-semibold md:text-6xl">Dec 11, 2027 · 20:00</h2>
            <p className="max-w-md text-muted-foreground">100% online. Denver time. Black tie — yes, even on camera.</p>
            <Countdown />
          </div>
        </div>
      </section>
    </>
  );
}
