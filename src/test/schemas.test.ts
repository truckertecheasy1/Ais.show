import { describe, expect, it } from "vitest";
import { voteSchema, leadSchema } from "@/lib/schemas";
import { PRIZE_TOTAL, ENTRY_FEE } from "@/lib/content";

describe("rules", () => {
  it("prize floor target totals $35,000", () => expect(PRIZE_TOTAL).toBe(35000));
  it("entry fee is $25", () => expect(ENTRY_FEE).toBe(25));
  it("rejects filled honeypot", () => {
    expect(leadSchema.safeParse({ name: "A", email: "a@b.co", interest_type: "viewer", website: "x" }).success).toBe(false);
  });
  it("rejects unknown host", () => {
    expect(voteSchema.safeParse({ email: "a@b.co", host_choice: "nobody" }).success).toBe(false);
  });
  it("normalizes vote email to lowercase", () => {
    const r = voteSchema.parse({ email: "A@B.CO", host_choice: "aria-nova" });
    expect(r.email).toBe("a@b.co");
  });
});
