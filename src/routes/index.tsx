import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/Countdown";
import { PosterRail, TopTenRail } from "@/components/site/PosterRail";
import { LeadForm } from "@/components/site/Forms";
import { CATEGORIES } from "@/lib/content";
import { t } from "@/lib/i18n";
import hostess from "@/assets/hostess.jpg";
import gala from "@/assets/gala.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE AIs — The AI Creator Awards" },
      { name: "description", content: "Not another feed to scroll. A night to be part of. The annual awards for AI-created content. Grand Gala Dec 11, 2027." },
      { property: "og:title", content: "THE AIs — The AI Creator Awards" },
      { property: "og:description", content: "Ten categories, a $35,000 prize floor target and a black-tie online gala." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img src={hostess} alt="A.I.S., the crystalline AI hostess" width={1280} height={1600}
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-top md:w-3/5" />
        <div className="absolute inset-0 bg-fade-r" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-fade-b" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-4 text-7xl font-bold tracking-tight text-silver-gradient md:text-9xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-xl font-display text-2xl font-medium italic text-foreground/80 md:text-3xl">{t.hero.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="silver" size="xl"><a href="#join">{t.hero.ctaJoin}</a></Button>
            <Button asChild variant="cinema" size="xl"><Link to="/sponsors">{t.hero.ctaSponsor}</Link></Button>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[["10", t.stats.categories], ["$35,000", t.stats.prize], ["3", t.stats.ceremonies]].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold text-foreground md:text-4xl">{v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">{t.hostess}</p>
        </div>
      </section>

      <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} to="/categories"
            className="shrink-0 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground transition hover:border-foreground hover:text-foreground">
            {c.name}
          </Link>
        ))}
      </div>

      <section className="mx-auto mt-12 max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-xl border border-border shadow-card">
          <img src={gala} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-fade-r" />
          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-3 text-4xl font-semibold uppercase md:text-5xl">{t.banner.title}</h2>
              <p className="mt-3 text-sm tracking-[0.25em] text-muted-foreground uppercase">{t.banner.meta}</p>
              <Button asChild variant="silver" className="mt-6"><Link to="/prizes">See prizes & gala</Link></Button>
            </div>
            <div className="flex items-end md:justify-end"><Countdown /></div>
          </div>
        </div>
      </section>

      <TopTenRail title="Top 10 awards this season" items={CATEGORIES} />
      <PosterRail title="Featured awards" items={CATEGORIES.filter((c) => c.badge === "TOP").concat(CATEGORIES.slice(2, 6))} wide />
      <PosterRail title="New this season" items={CATEGORIES.filter((c) => c.badge === "NEW")} />

      <section id="join" className="mx-auto mt-16 max-w-3xl scroll-mt-24 px-5">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-10">
          <p className="eyebrow">The list</p>
          <h2 className="mt-2 text-4xl font-semibold">Be in the room.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Gala invites, entry openings and podcast drops — first.</p>
          <div className="mt-6"><LeadForm /></div>
        </div>
      </section>
    </>
  );
}
