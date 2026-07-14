import { Moon, Sun } from "lucide-react";
import { Lang, supportedLanguages, t } from "../lib/i18n";
import { Button } from "./ui/button";

interface Props {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  dark: boolean;
  onToggleDark: () => void;
  onLogoClick: () => void;
  compact?: boolean;
}

export function Header({ lang, onLangChange, dark, onToggleDark, onLogoClick, compact }: Props) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md">
      {/* Desktop / Tablet (>=768px) */}
      <div className="mx-auto hidden max-w-5xl items-center justify-between gap-3 px-4 md:flex" style={{ height: "4rem" }}>
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 outline-none"
          aria-label={t(lang, "navigation.backHome")}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center">
            <img src="/logo.png" alt={t(lang, "app.name")} className="h-9 w-9 object-contain" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="font-semibold text-foreground">{t(lang, "app.name")}</span>
            {!compact && (
              <span className="text-xs text-muted-foreground">{t(lang, "app.tagline")}</span>
            )}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-border p-0.5"
            role="tablist"
            aria-label={t(lang, "navigation.languageSelector")}
          >
            {supportedLanguages.map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={lang === l}
              >
                {l === "fr"
                  ? t(lang, "languageSwitcher.french")
                  : l === "en"
                    ? t(lang, "languageSwitcher.english")
                    : t(lang, "languageSwitcher.arabic")}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleDark} aria-label={t(lang, "navigation.themeToggle")}>
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile (<768px) */}
      <div className="flex flex-col items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:gap-2 md:hidden">
        {/* Row: Logo + Name + Dark toggle */}
        <div className="relative flex w-full items-center justify-center">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 outline-none"
            aria-label={t(lang, "navigation.backHome")}
          >
            <img src="/logo.png" alt={t(lang, "app.name")} className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8" />
            <span className="text-sm font-semibold text-foreground sm:text-base">{t(lang, "app.name")}</span>
          </button>
          <div className="absolute right-3 sm:right-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={onToggleDark} aria-label={t(lang, "navigation.themeToggle")}>
              {dark ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Tagline */}
        {!compact && (
          <p className="max-w-[260px] text-center text-[10px] leading-snug text-muted-foreground sm:text-xs">
            {t(lang, "app.tagline")}
          </p>
        )}

        {/* Language selector */}
        <div
          className="flex items-center rounded-full border border-border p-px"
          role="tablist"
          aria-label={t(lang, "navigation.languageSelector")}
        >
          {supportedLanguages.map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`rounded-full px-2 py-0.5 text-[11px] leading-snug transition-colors sm:px-2.5 sm:py-1 sm:text-xs ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={lang === l}
            >
              {l === "fr"
                ? t(lang, "languageSwitcher.french")
                : l === "en"
                  ? t(lang, "languageSwitcher.english")
                  : t(lang, "languageSwitcher.arabic")}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
