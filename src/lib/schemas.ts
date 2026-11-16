import { z } from "zod";
import { HOSTS } from "./content";

const name = z.string().trim().min(1, "Name is required").max(100);
const email = z.string().trim().toLowerCase().email("Invalid email").max(255);
// Honeypot: must stay empty
const website = z.string().max(0, "spam").optional().default("");

export const leadSchema = z.object({
  name, email, website,
  interest_type: z.enum(["viewer", "creator", "sponsor", "press"]),
  language: z.string().trim().min(2).max(10).default("en"),
});

export const voteSchema = z.object({
  email, website,
  host_choice: z.enum(HOSTS.map((h) => h.id) as [string, ...string[]]),
});

export const sponsorSchema = z.object({
  name, email, website,
  company: z.string().trim().min(1, "Company is required").max(150),
  tier_interest: z.enum(["anchor", "platinum", "silver", "category", "undecided"]),
  message: z.string().trim().max(2000).optional().default(""),
});

export const entrySchema = z.object({
  name, email, website,
  category: z.string().trim().min(1).max(60),
});
