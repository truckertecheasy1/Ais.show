import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/content";
import gala from "@/assets/gala.jpg";
import hostess from "@/assets/hostess.jpg";

const imgs = [gala, hostess];

export function PosterCard({ c, i, wide = false }: { c: Category; i: number; wide?: boolean | undefined }) {
  return (
    <Link
      to="/categories"
      className={`group relative block shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-glow ${wide ? "aspect-video w-72" : "aspect-[2/3] w-40 md:w-48"}`}
    >
      <img
        src={imgs[i % 2]}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        style={{ objectPosition: `${(i * 23) % 100}% center` }}
      />
      <div className="absolute inset-0 bg-fade-card" />
      {c.badge && (
        <span data-award-badge className="absolute left-2 top-2 rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-accent-foreground">
          {c.badge}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-display text-lg font-semibold leading-tight text-ink">{c.name}</p>
        <p className="mt-1 text-xs font-medium text-ink/80">${c.prize.toLocaleString()}</p>
      </div>
    </Link>
  );
}

const railPad = "px-5 md:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]";

export function PosterRail({ title, items, wide }: { title: string; items: Category[]; wide?: boolean | undefined }) {
  return (
    <section className="mt-14">
      <h2 className="mx-auto max-w-7xl px-5 text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className={`no-scrollbar mt-4 flex snap-x gap-3 overflow-x-auto pb-4 ${railPad}`}>
        {items.map((c, i) => <PosterCard key={c.slug} c={c} i={i} wide={wide} />)}
      </div>
    </section>
  );
}

export function TopTenRail({ title, items }: { title: string; items: Category[] }) {
  return (
    <section className="mt-14">
      <h2 className="mx-auto max-w-7xl px-5 text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className={`no-scrollbar mt-4 flex snap-x items-end gap-1 overflow-x-auto pb-4 ${railPad}`}>
        {items.map((c, i) => (
          <div key={c.slug} className="flex shrink-0 snap-start items-end">
            <span
              aria-hidden="true"
              className="-mr-5 mb-1 select-none font-display text-[6.5rem] font-bold leading-[0.75] text-transparent md:-mr-7 md:text-[9rem]"
              style={{ WebkitTextStroke: "2px var(--foreground)" }}
            >
              {i + 1}
            </span>
            <PosterCard c={c} i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
