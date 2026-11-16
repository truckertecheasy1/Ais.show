import { createFileRoute } from "@tanstack/react-router";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";

async function record(session: any, env: StripeEnv, status: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const m = session.metadata ?? {};
  const { error } = await supabaseAdmin.from("entry_payments").upsert(
    {
      stripe_session_id: session.id,
      email: m.email ?? session.customer_details?.email ?? null,
      name: m.name ?? null,
      category: m.category ?? null,
      quantity: Number(m.quantity) || 1,
      amount_total: session.amount_total ?? null,
      currency: session.currency ?? null,
      status,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_session_id" },
  );
  if (error) throw new Error(`entry_payments upsert failed: ${error.message}`);
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          return Response.json({ received: true, ignored: "invalid env" });
        }
        const env: StripeEnv = rawEnv;
        try {
          const event = await verifyWebhook(request, env);
          const s = event.data.object;
          switch (event.type) {
            case "checkout.session.completed":
              await record(s, env, s.payment_status === "unpaid" ? "pending" : "paid");
              break;
            case "checkout.session.async_payment_succeeded":
              await record(s, env, "paid");
              break;
            case "checkout.session.async_payment_failed":
              await record(s, env, "failed");
              break;
            default:
              break;
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
