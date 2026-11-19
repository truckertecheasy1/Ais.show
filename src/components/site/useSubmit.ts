import { useState } from "react";
import type { ZodSchema } from "zod";
import { toast } from "sonner";
import { formToObject } from "./FormKit";
import { t } from "@/lib/i18n";

type Result = { ok: true } | { ok: false; error: string };
type FormErrors = { name?: string | undefined; email?: string | undefined; company?: string | undefined; message?: string | undefined; host_choice?: string | undefined; category?: string | undefined; channel_url?: string | undefined; work_url?: string | undefined; };

export function useSubmit<T>(schema: ZodSchema<T>, fn: (args: { data: T }) => Promise<Result>, successMsg: string = t.forms.success) {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(formToObject(form));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] = i.message;
      setErrors(errs as FormErrors);
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const res = await fn({ data: parsed.data });
      if (res.ok) {
        toast.success(successMsg);
        setDone(true);
        form.reset();
      } else toast.error(res.error);
    } catch {
      toast.error(t.forms.error);
    } finally {
      setPending(false);
    }
  }
  return { onSubmit, pending, errors, done, setDone };
}
