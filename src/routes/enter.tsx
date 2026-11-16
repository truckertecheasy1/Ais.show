import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { EntryInterestForm } from "@/components/site/Forms";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/enter")({
  head: () => ({
    meta: [
      { title: "Enter — THE AIs" },
      { name: "description", content: "Entries for THE AIs open soon. Register your interest and choose your category." },
      { property: "og:title", content: "Enter THE AIs — entries open soon" },
      { property: "og:description", content: "Register interest to be first when submissions open." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Enter,
});

function Enter() {
  return (
    <>
      <PageHeader eyebrow="Submissions" title="Enter your work">
        Entries aren't open yet. Tell us what you're making and we'll reserve you a front-row notification.
      </PageHeader>
      <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-2">
        <div className="space-y-5">
          <Button variant="cinema" size="xl" disabled className="w-full">{t.entriesSoon}</Button>
          <p className="text-sm text-muted-foreground">Entry fee will be $25 per submission. See the full <Link to="/rules" className="font-medium text-foreground underline underline-offset-4">rules & FAQ</Link>.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card"><EntryInterestForm /></div>
      </div>
    </>
  );
}
