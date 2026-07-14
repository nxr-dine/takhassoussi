import { ar } from "./ar";
import { en } from "./en";
import { fr } from "./fr";
import type { Lang, TranslationTree } from "./types";

export type { Lang, TranslationTree } from "./types";

export const translations: Record<Lang, TranslationTree> = { fr, en, ar };
export const supportedLanguages: Lang[] = ["fr", "en", "ar"];
export const defaultLanguage: Lang = "fr";

export function isLang(value: string | null | undefined): value is Lang {
  return value === "fr" || value === "en" || value === "ar";
}

export function getCurrentLanguage(): Lang {
  if (typeof document === "undefined") return defaultLanguage;
  return isLang(document.documentElement.lang) ? document.documentElement.lang : defaultLanguage;
}

function resolvePath(source: TranslationTree, key: string): unknown {
  return key.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[part];
  }, source);
}

export function t(lang: Lang, key: string, vars?: Record<string, string | number>) {
  const value = resolvePath(translations[lang], key);
  let text = typeof value === "string" ? value : key;
  if (vars) {
    for (const [token, replacement] of Object.entries(vars)) {
      text = text.replaceAll(`{${token}}`, String(replacement));
    }
  }
  return text;
}
