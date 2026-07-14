import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { defaultLanguage, isLang, Lang, t, translations } from "./lib/i18n";
import { search, correctQuery, Filters, TOTAL } from "./lib/search";
import { CONCEPTS } from "./lib/synonyms";
import { Program } from "./data/programs";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { ProgramCard } from "./components/ProgramCard";
import { FilterPanel } from "./components/FilterPanel";
import { EmptyState } from "./components/EmptyState";
import { DetailDrawer } from "./components/DetailDrawer";
import { DeveloperSection } from "./components/DeveloperSection";
import { Button } from "./components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const PAGE = 40;

function readStoredLanguage(): Lang {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = window.localStorage.getItem("language");
  return isLang(stored) ? stored : defaultLanguage;
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readStoredLanguage);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [selected, setSelected] = useState<Program | null>(null);
  const [visible, setVisible] = useState(PAGE);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    wilaya: "",
    institution: "",
    major: "",
    stream: "",
    minAvg: 0,
    sort: "relevance",
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  useEffect(() => {
    window.localStorage.setItem("language", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const searching = submitted !== null;

  const results = useMemo(() => {
    if (!searching) return [];
    try {
      return search(submitted!, filters);
    } catch (err) {
      console.error('Search() threw an error', err);
      return [];
    }
  }, [submitted, filters, searching]);

  // Debug helper: expose latest search inputs + result count for diagnostics
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const res = submitted !== null ? search(submitted, filters) : [];
        (window as any).__last_search_debug__ = { submitted, filters, resultCount: res.length };
      }
    } catch (e) {
      (window as any).__last_search_debug__ = { submitted, filters, error: String(e) };
    }
  }, [submitted, filters]);

  useEffect(() => setVisible(PAGE), [submitted, filters]);

  const runSearch = (v: string) => {
    setSubmitted(v);
  };

  const goHome = () => {
    setSubmitted(null);
    setQuery("");
    setFilters({ wilaya: "", institution: "", major: "", stream: "", minAvg: 0, sort: "relevance" });
  };

  const openProgram = (p: Program) => setSelected(p);

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    // If the user selected a general major and there's no query yet, set the
    // visible query to a friendly label and begin a search so results appear.
    if (f.major) {
      const concept = CONCEPTS.find((c) => c.match[0] === f.major || c.alias.includes(f.major));
      const arLabel = concept ? concept.alias.find((a) => /[\u0600-\u06FF]/.test(a)) : undefined;
      const label = lang === "ar" ? arLabel || f.major : concept ? concept.match[0] : f.major;
      if (submitted === null) {
        setQuery(label);
        setSubmitted(label);
      } else if (!query) {
        setQuery(label);
      }
      return;
    }
    // If no major selected and search not active, start an empty search so filters apply
    if (submitted === null) setSubmitted("");
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir={dir}>
      <Header
        lang={lang}
        onLangChange={setLang}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onLogoClick={goHome}
        compact={searching}
      />

      {!searching ? (
        /* ---------- HOME ---------- */
        <>
          <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-24 pt-16 sm:pt-28">
            <img src="/logo.png" alt={t(lang, "app.name")} className="mb-6 h-16 w-16 object-contain" />
            <h1 className="text-center text-foreground" style={{ fontSize: "2rem", lineHeight: 1.2 }}>
              {t(lang, "home.title")}
            </h1>
            <p className="mt-3 max-w-xl text-center text-muted-foreground">
              {t(lang, "home.subtitle", { count: TOTAL })}
            </p>

            <div className="mt-8 w-full">
              <SearchBar
                lang={lang}
                value={query}
                onChange={setQuery}
                onSubmit={runSearch}
                autoFocus
                size="hero"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">{t(lang, "search.examplesLabel")}</span>
              {translations[lang].search.examples.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setQuery(e);
                    runSearch(e);
                  }}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  {e}
                </button>
              ))}
            </div>
          </main>

          <DeveloperSection lang={lang} />
        </>
      ) : (
        /* ---------- RESULTS ---------- */
        <>
          <div className="sticky top-16 z-20 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-5xl px-3 py-2.5 sm:px-4 sm:py-3">
              <SearchBar
                lang={lang}
                value={query}
                onChange={setQuery}
                onSubmit={runSearch}
                size="compact"
              />
            </div>
          </div>

          <main className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-6">
            <div className="flex gap-8">
              {/* Sidebar filters (desktop) */}
              <aside className="hidden w-64 shrink-0 lg:block">
                <div className="sticky top-36 rounded-xl border border-border bg-card p-5">
                  <div className="mb-4 flex items-center gap-2 text-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    {t(lang, "filters.title")}
                  </div>
                  <FilterPanel lang={lang} filters={filters} onChange={handleFilterChange} />
                </div>
              </aside>

              <section className="min-w-0 flex-1">
                {/* Toolbar */}
                <div className="mb-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
                  <p className="text-sm text-muted-foreground">
                    {t(lang, results.length === 1 ? "results.countOne" : "results.count", {
                      count: results.length,
                    })}
                  </p>
                  <div className="flex items-center gap-2">
                    <Select
                      value={filters.sort}
                      onValueChange={(v) => setFilters({ ...filters, sort: v as Filters["sort"] })}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">{t(lang, "sorting.relevance")}</SelectItem>
                        <SelectItem value="avgDesc">{t(lang, "sorting.averageDesc")}</SelectItem>
                        <SelectItem value="avgAsc">{t(lang, "sorting.averageAsc")}</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Mobile filters (overlay) */}
                    <Button className="lg:hidden" onClick={() => setMobileOpen(true)}>
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      {t(lang, "filters.title")}
                    </Button>
                  </div>
                </div>

                {results.length === 0 ? (
                  <EmptyState
                    lang={lang}
                    mode="none"
                    suggestion={
                      submitted && correctQuery(submitted).changed
                        ? correctQuery(submitted).corrected
                        : undefined
                    }
                    onSuggestion={(s) => {
                      setQuery(s);
                      runSearch(s);
                    }}
                  />
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {results.slice(0, visible).map((r) => (
                      <ProgramCard key={r.id} lang={lang} prog={r} onOpen={openProgram} />
                    ))}
                    {visible < results.length && (
                      <div className="pt-2 text-center">
                        <Button variant="outline" onClick={() => setVisible((v) => v + PAGE)}>
                          {t(lang, "results.loadMore")} ({results.length - visible})
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </main>
        </>
      )}

      <DetailDrawer
        lang={lang}
        prog={selected}
        onClose={() => setSelected(null)}
        onOpen={openProgram}
      />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-full max-w-md rounded-t-2xl bg-background p-4 shadow-lg sm:m-6 sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t(lang, "filters.title")}</h3>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label={t(lang, "common.close")}>×</Button>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto">
              <FilterPanel lang={lang} filters={filters} onChange={(f) => { handleFilterChange(f); setMobileOpen(false); }} />
            </div>
          </div>
        </div>
      )}

      {/* Contact button removed per branding instructions */}
    </div>
  );
}
