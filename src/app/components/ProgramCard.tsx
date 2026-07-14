import { Building2, MapPin, ChevronRight, Hash, Layers } from "lucide-react";
import { Lang, t } from "../lib/i18n";
import { Program } from "../data/programs";
import { inferStreams, STREAMS } from "../lib/streams";

export function avgTone(avg: number | null) {
  if (avg === null) return "muted";
  if (avg >= 15) return "high";
  if (avg >= 12) return "medium";
  return "low";
}

interface Props {
  lang: Lang;
  prog: Program;
  onOpen: (p: Program) => void;
}

export function ProgramCard({ lang, prog, onOpen }: Props) {
  const streams = inferStreams(prog.major);
  return (
    <button
      onClick={() => onOpen(prog)}
      className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-start shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:items-center sm:gap-4 sm:p-4"
    >
      <div className="min-w-0 flex-1">
        {/* Major name (largest) + Arabic (smaller) */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="text-base font-medium text-foreground sm:text-lg">{prog.major}</h3>
          {prog.majorAr && (
            <span className="text-xs text-muted-foreground sm:text-sm" dir="rtl">
              {prog.majorAr}
            </span>
          )}
        </div>

        {/* University (medium) + Wilaya (small) */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:gap-x-4 sm:text-sm">
          <span className="flex min-w-0 items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="min-w-0 truncate">{prog.etb}</span>
          </span>
          {prog.wilaya && prog.wilaya !== "—" && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              {prog.wilaya}
            </span>
          )}
          {/* Code (smallest) */}
          <span className="flex items-center gap-1 font-mono text-[10px] opacity-60 sm:text-xs">
            <Hash className="h-3 w-3" />
            {prog.code}
          </span>
        </div>

        {/* Stream badges + priority count */}
        {(streams.length > 0 || prog.mins.length > 1) && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {streams.map((s) => (
              <span
                key={s}
                className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] text-accent-foreground sm:text-[11px]"
                title={lang === "ar" ? STREAMS[s].ar : lang === "en" ? STREAMS[s].en : STREAMS[s].fr}
              >
                {s}
              </span>
            ))}
            {prog.mins.length > 1 && (
              <span className="flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground sm:text-[11px]">
                <Layers className="h-3 w-3" />
                {prog.mins.length} {t(lang, "admission.priority")}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Admission average badge (highly emphasized) */}
      <div className="flex shrink-0 flex-col items-end gap-0.5 sm:gap-1">
        <span className="text-[9px] uppercase tracking-wide text-muted-foreground sm:text-[11px]">
          {t(lang, "admission.cutoff")}
        </span>
        <span className="rounded-lg px-2 py-1 text-sm font-semibold tabular-nums sm:px-2.5 sm:text-base" style={(() => {
          const tone = avgTone(prog.cutoff);
          if (tone === 'muted') return { backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' };
          if (tone === 'high') return { backgroundColor: 'var(--status-high-bg)', color: 'var(--status-high)' };
          if (tone === 'medium') return { backgroundColor: 'var(--status-medium-bg)', color: 'var(--status-medium)' };
          return { backgroundColor: 'var(--status-low-bg)', color: 'var(--status-low)' };
        })()}>
          {prog.cutoff !== null ? prog.cutoff.toFixed(2) : "\u2014"}
        </span>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:mt-0 sm:h-5 sm:w-5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
    </button>
  );
}
