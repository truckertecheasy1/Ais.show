import { Button } from "@/components/ui/button";
import { Field, Honeypot, fieldClass } from "./FormKit";
import { useSubmit } from "./useSubmit";
import { leadSchema, sponsorSchema, entrySchema } from "@/lib/schemas";
import { submitLead, submitSponsor, submitEntryInterest } from "@/lib/forms.functions";
import { CATEGORIES, SPONSOR_TIERS } from "@/lib/content";
import { t } from "@/lib/i18n";

export function LeadForm({ defaultInterest = "viewer" }: { defaultInterest?: string }) {
  const { onSubmit, pending, errors } = useSubmit(leadSchema, submitLead);
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2" noValidate>
      <Honeypot />
      <input type="hidden" name="language" value="en" />
      <Field label={t.forms.name} error={errors.name}><input name="name" className={fieldClass} maxLength={100} /></Field>
      <Field label={t.forms.email} error={errors.email}><input name="email" type="email" className={fieldClass} maxLength={255} /></Field>
      <Field label="I'm joining as">
        <select name="interest_type" defaultValue={defaultInterest} className={fieldClass}>
          <option value="viewer">Viewer / guest</option>
          <option value="creator">Creator</option>
          <option value="sponsor">Sponsor</option>
          <option value="press">Press</option>
        </select>
      </Field>
      <div className="flex items-end">
        <Button type="submit" variant="silver" size="xl" className="w-full" disabled={pending}>
          {pending ? t.forms.sending : t.hero.ctaJoin}
        </Button>
      </div>
    </form>
  );
}

export function SponsorForm() {
  const { onSubmit, pending, errors } = useSubmit(sponsorSchema, submitSponsor, "Thank you — our partnerships team will be in touch.");
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2" noValidate>
      <Honeypot />
      <Field label="Company" error={errors.company}><input name="company" className={fieldClass} maxLength={150} /></Field>
      <Field label={t.forms.name} error={errors.name}><input name="name" className={fieldClass} maxLength={100} /></Field>
      <Field label={t.forms.email} error={errors.email}><input name="email" type="email" className={fieldClass} maxLength={255} /></Field>
      <Field label="Tier of interest">
        <select name="tier_interest" defaultValue="undecided" className={fieldClass}>
          {SPONSOR_TIERS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          <option value="undecided">Not sure yet</option>
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" error={errors.message}>
          <textarea name="message" rows={4} maxLength={2000} className={`${fieldClass} h-auto py-2`} />
        </Field>
      </div>
      <Button type="submit" variant="silver" size="xl" className="sm:col-span-2" disabled={pending}>
        {pending ? t.forms.sending : "Send inquiry"}
      </Button>
    </form>
  );
}

export function EntryInterestForm() {
  const { onSubmit, pending, errors } = useSubmit(entrySchema, submitEntryInterest, "Noted. We'll email you the moment entries open.");
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4" noValidate>
      <Honeypot />
      <Field label={t.forms.name} error={errors.name}><input name="name" className={fieldClass} maxLength={100} /></Field>
      <Field label={t.forms.email} error={errors.email}><input name="email" type="email" className={fieldClass} maxLength={255} /></Field>
      <Field label="Category">
        <select name="category" defaultValue="film" className={fieldClass}>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </Field>
      <Field label="Your channel (YouTube or Instagram)" error={errors.channel_url}><input name="channel_url" type="url" className={fieldClass} maxLength={255} /></Field>
      <Field label="Link to your work (video or post)" error={errors.work_url}><input name="work_url" type="url" className={fieldClass} maxLength={255} /></Field>
      <p className="text-sm text-muted-foreground">We judge your work on your channel — link the video or post.</p>
      <Button type="submit" variant="silver" size="xl" disabled={pending}>
        {pending ? t.forms.sending : "Notify me when entries open"}
      </Button>
    </form>
  );
}
