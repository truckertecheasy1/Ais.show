import type { ReactNode } from "react";

export const fieldClass =
  "h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

export function Field({ label, children, error }: { label: string; children: ReactNode; error?: string | undefined }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

/** Hidden honeypot. Real users never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function formToObject(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
}
