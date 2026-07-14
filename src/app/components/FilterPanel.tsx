import React, { useState } from "react";
import { Lang, t } from "../lib/i18n";
import { Filters, WILAYAS, INSTITUTIONS } from "../lib/search";
import { STREAM_LIST } from "../lib/streams";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface Props {
  lang: Lang;
  filters: Filters;
  onChange: (f: Filters) => void;
}

export function FilterPanel({ lang, filters, onChange }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const active = !!filters.wilaya || !!filters.institution || !!filters.stream;

  

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{t(lang, "filters.wilaya")}</Label>
        <Select
          value={filters.wilaya || "all"}
          onValueChange={(v) => set({ wilaya: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t(lang, "filters.allWilayas")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t(lang, "filters.allWilayas")}</SelectItem>
            {WILAYAS.map((w) => (
              <SelectItem key={w} value={w}>
                {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t(lang, "filters.stream")}</Label>
        <Select
          value={filters.stream || "all"}
          onValueChange={(v) => set({ stream: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t(lang, "filters.allStreams")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t(lang, "filters.allStreams")}</SelectItem>
            {STREAM_LIST.map((s) => (
              <SelectItem key={s.code} value={s.code}>
                {lang === "ar" ? s.ar : lang === "en" ? s.en : s.fr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t(lang, "filters.institution")}</Label>
        <Select
          value={filters.institution || "all"}
          onValueChange={(v) => set({ institution: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t(lang, "filters.allInstitutions")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t(lang, "filters.allInstitutions")}</SelectItem>
            {INSTITUTIONS.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* minAverage filter removed */}

      {active && (
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() => set({ wilaya: "", institution: "", major: "", stream: "", minAvg: 0 })}
        >
          {t(lang, "filters.clear")}
        </Button>
      )}
    </div>
  );
}
