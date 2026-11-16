import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/Layout";
import { SponsorForm } from "@/components/site/Forms";
import { SPONSOR_TIERS } from "@/lib/content";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — THE AIs" },
      { name: "description", content: "Partner with THE AIs. Anchor, Platinum, Silver and Category sponsorships for the AI Creator Awards." },
      { property: "og:title", content: "Sponsor THE AIs" },
      { property: "og:description", content: "Put your brand on the stage of the first black-tie awards for AI creators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sponsors,
});

function Sponsors() {
  return (
    <>
      <PageHeader eyebrow="Partnerships" title="Become a sponsor">
        Our anchor sponsor turns the prize floor from a target into a guarantee. Be the name on the night.
      </PageHeader>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 lg:grid-cols-4">
        {SPONSOR_TIERS.map((s, i) => (
          <div key={s.id} className={`rounded-xl border p-6 ${i === 0 ? "border-foreground bg-card shadow-glow" : "border-border bg-card shadow-card"}`}>
            <p className="eyebrow">{s.price}</p>
            <h2 className="mt-2 text-3xl font-semibold">{s.name}</h2>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {s.perks.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-foreground" />{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <section className="mx-auto mt-16 max-w-3xl px-5">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-10">
          <h2 className="text-4xl font-semibold">Sponsor inquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tell us about your brand. We reply within two business days.</p>
          <div className="mt-6"><SponsorForm /></div>
        </div>
      </section>
    </>
  );
}
