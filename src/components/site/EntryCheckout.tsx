import { useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createEntryCheckout } from "@/lib/payments.functions";
import { CATEGORIES, ENTRY_FEE } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Field, fieldClass } from "./FormKit";

type Details = { name: string; email: string; category: string; quantity: number };

export function PaymentTestModeBanner() {
  const token = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
  if (!token) return <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">Payments are not live yet. Complete payments go-live to accept real entry fees.</p>;
  if (token.startsWith("pk_test_")) return <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-2 text-sm">All payments made in the preview are in test mode.</p>;
  return null;
}

export function EntryCheckout() {
  const [details, setDetails] = useState<Details | null>(null);
  const [error, setError] = useState<string>();

  if (details) {
    const fetchClientSecret = async () => {
      const res = await createEntryCheckout({
        data: { ...details, returnUrl: `${window.location.origin}/enter/return?session_id={CHECKOUT_SESSION_ID}`, environment: getStripeEnvironment() },
      });
      if ("error" in res) throw new Error(res.error);
      return res.clientSecret;
    };
    return (
      <div className="space-y-3">
        <PaymentTestModeBanner />
        <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        <button type="button" onClick={() => setDetails(null)} className="text-sm text-muted-foreground underline">Edit details</button>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name") ?? "").trim();
        const email = String(f.get("email") ?? "").trim();
        if (!name || !/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter your name and a valid email.");
        setError(undefined);
        setDetails({ name, email, category: String(f.get("category")), quantity: Number(f.get("quantity")) || 1 });
      }}
    >
      <PaymentTestModeBanner />
      <Field label="Name"><input name="name" className={fieldClass} maxLength={100} /></Field>
      <Field label="Email"><input name="email" type="email" className={fieldClass} maxLength={255} /></Field>
      <Field label="Category">
        <select name="category" defaultValue="film" className={fieldClass}>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </Field>
      <Field label={`Number of submissions ($${ENTRY_FEE} each)`}>
        <input name="quantity" type="number" min={1} max={10} defaultValue={1} className={fieldClass} />
      </Field>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" variant="silver" size="xl">Continue to payment</Button>
    </form>
  );
}
