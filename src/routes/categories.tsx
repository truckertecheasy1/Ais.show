import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { CATEGORIES } from "@/lib/content";
import gala from "@/assets/gala.jpg";
import hostess from "@/assets/hostess.jpg";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — THE AIs" },
      { name: "description", content: "The 10 award categories of THE AIs, from Film of the Year to Breakthrough Creator." },
      { property: "og:title", content: "The 10 Categories — THE AIs" },
      { property: "og:description", content: "Film of the Year, Most Viral and eight more awards for AI-created work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <>
      <PageHeader eyebrow="Ten awards" title="Categories">One night. Ten statues. Every one of them earned by a creator working with AI.</PageHeader>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <article key={c.slug} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
            <img src={i % 2 ? hostess : gala} alt="" loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              style={{ objectPosition: `${(i * 31) % 100}% 30%` }} />
            <div className="absolute inset-0 bg-fade-card" />
            <span className="absolute right-4 top-4 font-display text-5xl font-bold text-ink/50">{String(i + 1).padStart(2, "0")}</span>
            {c.badge && <span data-award-badge className="absolute left-4 top-4 rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-accent-foreground">{c.badge}</span>}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h2 className="text-3xl font-semibold text-ink">{c.name}</h2>
              <p className="mt-1 text-sm text-ink/75">{c.blurb}</p>
              <p className="mt-3 text-xs font-semibold tracking-[0.25em] text-ink uppercase">${c.prize.toLocaleString()} prize</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
