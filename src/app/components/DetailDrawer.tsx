import { Building2, MapPin, Hash, GraduationCap, Layers, Compass } from "lucide-react";
import { Lang, t } from "../lib/i18n";
import { Program } from "../data/programs";
import { sameMajor } from "../lib/search";
import { inferStreams, STREAMS } from "../lib/streams";
import { avgTone } from "./ProgramCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

interface Props {
  lang: Lang;
  prog: Program | null;
  onClose: () => void;
  onOpen: (p: Program) => void;
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
}

export function DetailDrawer({ lang, prog, onClose, onOpen }: Props) {
  const open = prog !== null;
  const others = prog ? sameMajor(prog).slice(0, 6) : [];
  const streams = prog ? inferStreams(prog.major) : [];
  const roundLabels = [
    t(lang, "admission.roundLabels.first"),
    t(lang, "admission.roundLabels.second"),
    t(lang, "admission.roundLabels.third"),
  ];

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={lang === "ar" ? "left" : "right"}
        className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md"
        closeLabel={t(lang, "common.close")}
      >
        {prog && (
          <>
            <SheetHeader className="gap-2 border-b border-border bg-accent/40 p-6 text-start">
              <div className="flex items-center gap-2 text-sm text-primary">
                <GraduationCap className="h-4 w-4" />
                {t(lang, "admission.session")}
              </div>
              <SheetTitle className="text-start text-foreground">{prog.major}</SheetTitle>
              {prog.majorAr && (
                <SheetDescription className="text-start text-base text-muted-foreground" dir="rtl">
                  {prog.majorAr}
                </SheetDescription>
              )}
            </SheetHeader>

            <div className="space-y-6 p-6">
              {/* Priority mapping */}
              <div>
                <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  {t(lang, "admission.priorityMap")}
                </div>
                <div className="mb-3 text-xs text-muted-foreground">
                  {t(lang, "admission.historicalCutoff")}
                </div>
                {prog.mins.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {prog.mins.map((m, i) => (
                        <div
                          key={i}
                          className={`flex flex-col items-center rounded-xl px-4 py-2 ${avgTone(m)}`}
                        >
                          <span className="text-[10px] uppercase opacity-70">
                            {t(lang, "admission.priority")} {i + 1} · {roundLabels[i]}
                          </span>
                          <span className="tabular-nums">{m.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{t(lang, "admission.priorityNote")}</p>
                  </>
                ) : (
                  <div className="text-muted-foreground">{t(lang, "admission.noAverage")}</div>
                )}
              </div>

              {streams.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Compass className="h-3.5 w-3.5" />
                      {t(lang, "admission.suggestedStreams")}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {streams.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg bg-accent px-2.5 py-1 text-sm text-accent-foreground"
                        >
                          {lang === "ar" ? STREAMS[s].ar : lang === "en" ? STREAMS[s].en : STREAMS[s].fr}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-4">
                <InfoRow
                  icon={<Building2 className="h-4 w-4" />}
                  label={t(lang, "details.institution")}
                  value={prog.etb}
                />
                {prog.wilaya && prog.wilaya !== "—" && (
                  <InfoRow
                    icon={<MapPin className="h-4 w-4" />}
                    label={t(lang, "details.wilaya")}
                    value={prog.wilaya}
                  />
                )}
                <InfoRow
                  icon={<Hash className="h-4 w-4" />}
                  label={t(lang, "details.code")}
                  value={`${prog.etbCode} · ${prog.code}`}
                />
              </div>

              {others.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-foreground">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      {t(lang, "details.otherInstitutions")}
                    </div>
                    <div className="space-y-2">
                      {others.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => onOpen(r)}
                          className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 text-start transition-colors hover:border-primary/40"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm text-foreground">{r.major}</div>
                            <div className="truncate text-xs text-muted-foreground">
                              {r.etb}
                              {r.wilaya !== "—" ? ` · ${r.wilaya}` : ""}
                            </div>
                          </div>
                          <span
                            className={`shrink-0 rounded-md px-2 py-0.5 text-sm tabular-nums ${avgTone(
                              r.cutoff
                            )}`}
                          >
                            {r.cutoff !== null ? r.cutoff.toFixed(2) : "—"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
