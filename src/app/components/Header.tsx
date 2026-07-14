import { GraduationCap, Moon, Sun } from "lucide-react";
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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 outline-none"
          aria-label={t(lang, "navigation.backHome")}
        >
          <span className="flex h-9 w-9 items-center justify-center">
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
    </header>
  );
}
