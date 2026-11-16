import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/Layout";
import { Field, Honeypot, fieldClass } from "@/components/site/FormKit";
import { useSubmit } from "@/components/site/useSubmit";
import { HOSTS } from "@/lib/content";
import { voteSchema } from "@/lib/schemas";
import { getVoteCounts, submitVote } from "@/lib/forms.functions";
import { HOST_PORTRAITS } from "@/lib/host-portraits";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Vote the Podcast Hosts — THE AIs" },
      { name: "description", content: "Six AI finalists. One host duo. Cast your public vote for the official THE AIs podcast hosts." },
      { property: "og:title", content: "Pick the THE AIs podcast hosts" },
      { property: "og:description", content: "One vote per email. Live results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Podcast,
});

function Podcast() {
  const qc = useQueryClient();
  const { data: counts = {} } = useQuery({ queryKey: ["votes"], queryFn: () => getVoteCounts(), refetchInterval: 15000 });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const [choice, setChoice] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  function selectHost(id: string) {
    setChoice(id);
    formRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
    emailRef.current?.focus({ preventScroll: true });
  }
  const { onSubmit, pending, errors, done } = useSubmit(voteSchema, async (args) => {
    const r = await submitVote(args);
    if (r.ok) qc.invalidateQueries({ queryKey: ["votes"] });
    return r;
  }, "Vote counted. Thank you!");

  return (
    <>
      <PageHeader eyebrow="Public vote" title="Choose the host duo">
        Six AI finalists. The two with the most votes host the official THE AIs podcast. One vote per email.
      </PageHeader>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOSTS.map((h) => {
          const n = counts[h.id] ?? 0;
          const pct = total ? Math.round((n / total) * 100) : 0;
          const selected = choice === h.id;
          return (
            <article key={h.id}
              className={`group overflow-hidden rounded-lg border bg-card text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${selected ? "border-accent shadow-glow" : "border-border hover:border-accent/60"}`}>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={HOST_PORTRAITS[h.id]} alt={`Portrait of ${h.name}`} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-semibold">{h.name}</h2>
                  <span className="font-display text-xl font-semibold">{pct}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{h.persona}</p>
                <div role="progressbar" aria-label={`${h.name} vote share`} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="vote-progress h-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <Button type="button" variant={selected ? "silver" : "cinema"} className="mt-5 w-full" aria-label={`Vote for ${h.name}`} aria-pressed={selected} disabled={done || pending} onClick={() => selectHost(h.id)}>{selected ? "Selected" : "Vote"}</Button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mx-auto mt-3 max-w-7xl px-5 text-xs text-muted-foreground">{total.toLocaleString()} votes · updates live</p>

      <section className="mx-auto mt-12 max-w-xl px-5">
        <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <Honeypot />
          <input type="hidden" name="host_choice" value={choice} />
          <p className="text-sm">{choice ? <>Your pick: <span className="font-semibold">{HOSTS.find((h) => h.id === choice)?.name}</span></> : "Select a finalist above."}</p>
          {errors.host_choice && <p className="text-xs text-destructive">Please choose a host.</p>}
          <Field label="Email" error={errors.email}><input ref={emailRef} name="email" type="email" maxLength={255} className={fieldClass} /></Field>
          <Button type="submit" variant="silver" size="xl" className="w-full" disabled={pending || done || !choice}>
            {done ? "Thanks for voting" : pending ? "Sending…" : "Cast my vote"}
          </Button>
        </form>
      </section>
    </>
  );
}
