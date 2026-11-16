import { Link } from "@tanstack/react-router";
import { Award, Film, Home, Mic, Ticket } from "lucide-react";
import type { ReactNode } from "react";
import { t } from "@/lib/i18n";

const links = [
  { to: "/", label: t.nav.home },
  { to: "/categories", label: t.nav.categories },
  { to: "/prizes", label: t.nav.prizes },
  { to: "/sponsors", label: t.nav.sponsors },
  { to: "/podcast", label: t.nav.podcast },
  { to: "/enter", label: t.nav.enter },
  { to: "/rules", label: t.nav.rules },
] as const;

const mobile = [
  { to: "/", label: t.nav.home, icon: Home },
  { to: "/categories", label: "Awards", icon: Film },
  { to: "/prizes", label: "Gala", icon: Award },
  { to: "/podcast", label: "Vote", icon: Mic },
  { to: "/enter", label: t.nav.enter, icon: Ticket },
] as const;

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl font-semibold tracking-[0.15em] text-silver-gradient">
      THE AIs
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-background via-background/80 to-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/rules" className="text-xs text-muted-foreground lg:hidden">{t.nav.rules}</Link>
      </div>
    </header>
  );
}

export function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card/90 shadow-glow backdrop-blur-xl lg:hidden">
      <ul className="grid grid-cols-5">
        {mobile.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2.5 text-[10px] text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border pb-28 pt-12 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">The AI Creator Awards · ais.show</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="eyebrow mb-2">Contact</p>
          <p>General — <span className="font-medium text-foreground">hello@ais.show</span></p>
          <p>Sponsors — <span className="font-medium text-foreground">sponsors@ais.show</span></p>
          <p>Press — <span className="font-medium text-foreground">press@ais.show</span></p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground md:justify-end">
          {links.slice(1).map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-foreground">{l.label}</Link>
          ))}
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-muted-foreground">© 2026 {t.footer.rights}</p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-28">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-5xl font-medium md:text-7xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-muted-foreground">{children}</div>}
      <div className="silver-rule mt-10" />
    </section>
  );
}
