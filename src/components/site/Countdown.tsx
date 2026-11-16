import { useEffect, useState } from "react";
import { GALA_DATE_ISO } from "@/lib/content";
import { t } from "@/lib/i18n";

const target = new Date(GALA_DATE_ISO).getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const vals = now === null ? [null, null, null, null] : parts(target - now);
  const labels = [t.countdown.days, t.countdown.hours, t.countdown.minutes, t.countdown.seconds];
  return (
    <div>
      <p className="eyebrow">{t.countdown.title}</p>
      <div className="mt-3 flex gap-3">
        {vals.map((v, i) => (
          <div key={i} className="countdown-cell min-w-16 rounded-lg border border-border bg-card/80 px-3 py-2 text-center shadow-card backdrop-blur">
            <div className="font-display text-3xl tabular-nums text-silver-bright md:text-4xl">
              {v === null ? "--" : String(v).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
