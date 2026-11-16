import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/enter/return")({
  validateSearch: (s: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Entry confirmed — THE AIs" },
      { name: "description", content: "Your entry fee for THE AIs has been received." },
      { property: "og:title", content: "Entry confirmed — THE AIs" },
      { property: "og:description", content: "Thank you for entering THE AIs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Return,
});

function Return() {
  const { session_id } = Route.useSearch();
  return (
    <>
      <PageHeader eyebrow="Submissions" title={session_id ? "You're in." : "No payment found"}>
        {session_id
          ? "Your entry fee was received. A receipt is on its way to your email, and we'll send upload instructions next."
          : "We couldn't find a completed payment. You can try again from the Enter page."}
      </PageHeader>
      <div className="mx-auto max-w-3xl px-5">
        <Button asChild variant="silver" size="xl"><Link to="/enter">Back to Enter</Link></Button>
      </div>
    </>
  );
}
