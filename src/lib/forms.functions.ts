import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { entrySchema, leadSchema, sponsorSchema, voteSchema } from "./schemas";

type Result = { ok: true } | { ok: false; error: string };

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

function mapError(e: { code?: string; message?: string } | null, dupMsg: string): Result {
  if (!e) return { ok: true };
  if (e.code === "23505") return { ok: false, error: dupMsg };
  if (e.message?.includes("rate_limited")) return { ok: false, error: "Too many submissions. Please wait a few minutes." };
  console.error("insert failed", e.code);
  return { ok: false, error: "Could not save. Please try again." };
}

// Honeypot hits get a silent fake success.
const isBot = (d: { website?: string }) => Boolean(d.website);

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => leadSchema.parse(i))
  .handler(async ({ data }): Promise<Result> => {
    if (isBot(data)) return { ok: true };
    const { website: _w, ...row } = data;
    const { error } = await publicClient().from("leads").insert(row);
    return mapError(error, "You're already on the list.");
  });

export const submitSponsor = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => sponsorSchema.parse(i))
  .handler(async ({ data }): Promise<Result> => {
    if (isBot(data)) return { ok: true };
    const { website: _w, ...row } = data;
    const { error } = await publicClient().from("sponsor_inquiries").insert(row);
    return mapError(error, "Already received.");
  });

export const submitEntryInterest = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => entrySchema.parse(i))
  .handler(async ({ data }): Promise<Result> => {
    if (isBot(data)) return { ok: true };
    const { website: _w, ...row } = data;
    const { error } = await publicClient().from("entry_interest").insert(row);
    return mapError(error, "Already received.");
  });

export const submitVote = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => voteSchema.parse(i))
  .handler(async ({ data }): Promise<Result> => {
    if (isBot(data)) return { ok: true };
    const { website: _w, ...row } = data;
    const { error } = await publicClient().from("votes").insert(row);
    return mapError(error, "This email has already voted.");
  });

export const getVoteCounts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().rpc("get_vote_counts");
  if (error) return {} as Record<string, number>;
  return Object.fromEntries((data ?? []).map((r) => [r.host_choice, Number(r.votes)])) as Record<string, number>;
});
