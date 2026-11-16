import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";
import { CATEGORIES, ENTRIES_OPEN, ENTRY_PRICE_ID } from "./content";

type CheckoutSessionResult = { clientSecret: string } | { error: string };

export const entryCheckoutSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email").max(255),
  category: z.enum(CATEGORIES.map((c) => c.slug) as [string, ...string[]]),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
  returnUrl: z.string().url().max(500),
  environment: z.enum(["sandbox", "live"]),
});

export const createEntryCheckout = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => entryCheckoutSchema.parse(i))
  .handler(async ({ data }): Promise<CheckoutSessionResult> => {
    if (!ENTRIES_OPEN) return { error: "Entries are not open yet." };
    try {
      const stripe = createStripeClient(data.environment as StripeEnv);
      const prices = await stripe.prices.list({ lookup_keys: [ENTRY_PRICE_ID] });
      const price = prices.data[0];
      if (!price) return { error: "Entry price not found" };
      const productId = typeof price.product === "string" ? price.product : price.product.id;
      const product = await stripe.products.retrieve(productId);

      const existing = await stripe.customers.list({ email: data.email, limit: 1 });
      const customer = existing.data[0]?.id ?? (await stripe.customers.create({ email: data.email, name: data.name })).id;

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: data.quantity }],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        customer,
        automatic_tax: { enabled: true },
        customer_update: { address: "auto" },
        payment_intent_data: { description: product.name },
        metadata: { name: data.name, email: data.email, category: data.category, quantity: String(data.quantity) },
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });
