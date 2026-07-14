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
      {/* Desktop / Tablet */}
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

      {/* Mobile */}
      <div className="flex flex-col items-center gap-2 px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 outline-none"
            aria-label={t(lang, "navigation.backHome")}
          >
            <img src="/logo.png" alt={t(lang, "app.name")} className="h-8 w-8 shrink-0 object-contain" />
            <span className="text-base font-semibold text-foreground">{t(lang, "app.name")}</span>
          </button>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onToggleDark} aria-label={t(lang, "navigation.themeToggle")}>
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {!compact && (
          <p className="text-center text-xs leading-snug text-muted-foreground">
            {t(lang, "app.tagline")}
          </p>
        )}

        <div
          className="flex items-center rounded-full border border-border p-0.5"
          role="tablist"
          aria-label={t(lang, "navigation.languageSelector")}
        >
          {supportedLanguages.map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`rounded-full px-2.5 py-1 text-xs transition-colors sm:px-3 sm:text-sm ${
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
