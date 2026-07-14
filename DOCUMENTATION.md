# تخصصي (Takhassoussi) — Documentation

> "اكتشف تخصصك، وابنِ مستقبلك" — Discover your specialty, build your future.

A trilingual (Arabic/French/English) search engine for Algerian university programs. Students can search across ~1000+ university majors, view admission cutoff averages, BAC stream priorities, and filter by wilaya, institution, and stream. Data is sourced from official BAC 2025 admission PDFs published by dzexams.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3.1 (single page, no router) |
| Language | TypeScript |
| Bundler | Vite 6.3.5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + custom CSS variables |
| UI Library | shadcn/ui (Radix UI primitives + class-variance-authority) |
| Icons | lucide-react |
| Package Manager | pnpm |
| Fonts | Inter, Noto Sans Arabic, IBM Plex Sans, Cairo |
| Dark Mode | CSS class-based (`.dark` on `<html>`) |

---

## Directory Structure

```
takhassoussi/
├── index.html                          # Vite entry (Arabic meta, PWA, Google Fonts)
├── manifest.webmanifest                # PWA manifest (standalone, blue theme)
├── package.json                        # Dependencies & scripts
├── vite.config.ts                      # Vite plugins + path aliases
├── postcss.config.mjs                  # Empty (Tailwind v4 handles PostCSS)
├── public/
│   └── logo.png                        # App icon (512x512)
├── src/
│   ├── main.tsx                        # React entry point
│   ├── assets/
│   │   └── logo.svg                    # SVG logo
│   ├── imports/
│   │   ├── dzexams-docs-bac-909486.pdf    # Source PDF (original)
│   │   ├── dzexams-docs-bac-909486-1.pdf  # Source PDF (page 1)
│   │   └── dzexams-docs-bac-909486-2.pdf  # Source PDF (page 2)
│   ├── styles/
│   │   ├── index.css                   # CSS entry point
│   │   ├── fonts.css                   # Google Fonts imports
│   │   ├── tailwind.css                # Tailwind v4 config
│   │   ├── theme.css                   # Design tokens (light + dark)
│   │   └── globals.css                 # Empty
│   ├── i18n/
│   │   ├── types.ts                    # Lang type + TranslationTree
│   │   ├── index.ts                    # i18n engine (t(), helpers)
│   │   ├── ar.ts                       # Arabic translations
│   │   ├── fr.ts                       # French translations
│   │   └── en.ts                       # English translations
│   └── app/
│       ├── App.tsx                     # Root component (state, layout, routing)
│       ├── lib/
│       │   ├── i18n.ts                 # Re-export wrapper
│       │   ├── search.ts               # Search engine (normalize, index, search, suggestions)
│       │   ├── streams.ts              # BAC stream inference
│       │   └── synonyms.ts             # Query-expansion knowledge base
│       ├── data/
│       │   ├── programs.ts             # Auto-generated Program[] (~1000+ entries)
│       │   └── universities.json       # Auto-generated university metadata + aliases
│       └── components/
│           ├── Header.tsx              # Top nav: logo, language switcher, dark toggle
│           ├── SearchBar.tsx           # Search input with autocomplete
│           ├── ProgramCard.tsx         # Result card (major, institution, cutoff)
│           ├── FilterPanel.tsx         # Sidebar filters (wilaya, stream, institution)
│           ├── EmptyState.tsx          # Empty/no-results state
│           ├── DetailDrawer.tsx        # Program detail side sheet
│           └── ui/                     # 35+ shadcn/ui components
├── tools/
│   ├── extract_etb.js                  # Extract institution names from programs.ts
│   ├── generate_universities.js        # Generate universities.json (ESM)
│   ├── generate_universities.cjs       # Generate universities.json (CJS, more robust)
│   ├── enrich_universities.cjs         # Add misspelling variants + aliases
│   └── clean_universities.cjs          # Clean control chars + deduplicate
└── guidelines/
    └── Guidelines.md                   # AI coding guidelines template
```

---

## Data Pipeline

The application data flows through a multi-stage offline pipeline before reaching the browser:

### Stage 1: Source PDFs
Raw BAC 2025 admission data from dzexams, stored in `src/imports/`. Contains tabular data with program names, institutions, wilayas, and admission cutoff averages.

### Stage 2: Extraction & Generation (offline tools)
Node.js scripts in `tools/` are run manually to process the data:

| Script | Purpose |
|---|---|
| `extract_etb.js` | Extracts unique institution names from `programs.ts` via regex |
| `generate_universities.cjs` | Groups programs by institution, generates `universities.json` with aliases, acronyms, and misspelling variants |
| `enrich_universities.cjs` | Post-processes `universities.json` — adds ASCII folding, English translations, abbreviations, vowel-drop misspellings, adjacent-letter swaps (up to 300 aliases per university) |
| `clean_universities.cjs` | Removes control characters, collapses whitespace, deduplicates aliases |

### Stage 3: Generated Runtime Data
- **`programs.ts`** — Contains the `Program` interface and a massive `programs: Program[]` array with ~1000+ entries. Each program has: `id`, `major` (French), `majorAr` (Arabic), `etb` (institution), `etbCode`, `wilaya`, `code`, `mins` (priority tier averages), `cutoff` (primary cutoff).
- **`universities.json`** — University metadata with name, code, wilayas, sample majors, and extensive alias arrays for fuzzy matching.

### Stage 4: Client-Side Runtime
All data is bundled in the source tree. No API calls, no backend. Search runs entirely client-side with a pre-computed index built at module load time.

---

## Search Engine (`src/app/lib/search.ts`)

### Text Normalization
The `normalize()` function:
1. Lowercases and trims
2. Strips French accents via NFD decomposition
3. Removes Arabic diacritics (tashkeel)
4. Unifies Arabic letter variants: alef variants → alef, taa marbuta → haa, alef maqsura → yaa
5. Collapses whitespace

### Pre-Computed Index
At module load, builds an inverted index over all programs. For each program, computes a normalized "haystack" string containing: normalized major name, Arabic name, institution, code, plus synonyms/aliases injected from the `CONCEPTS` and `ETB_TAGS` knowledge bases. Also pre-computes inferred BAC streams.

### Search Algorithm
1. Normalizes query and applies typo correction
2. Splits into terms; **all terms must appear** in the haystack (AND semantics)
3. Scoring:
   - Prefix match on major name: **100 points**
   - Contains in major name: **60 points**
   - Synonym/alias match: **40 points**
   - Match elsewhere (institution, code): **20 points**
   - Shorter major names get a slight bonus (more precise match)
4. If no program matches, falls back to **fuzzy university name matching** (substring + Levenshtein edit distance)
5. Applies filters: wilaya, institution, major (via CONCEPTS), stream, minimum average
6. Sorts by: relevance (score desc), or average ascending/descending

### Typo Correction
- Builds a vocabulary from all indexed tokens (3+ characters)
- Uses Levenshtein edit distance (max 1–2 depending on term length) to snap misspelled words to nearest known token
- Exposed to UI as a "did you mean" suggestion

### Autocomplete
`returns distinct major names matching the query prefix/contains on normalized, Arabic, and alias fields. Sorted by prefix-first then frequency.

### Related Programs
- `sameMajor()` — other institutions offering the exact same major
- `related()` — same major elsewhere, then same institution with different majors

### Derived Data
- `WILAYAS` — distinct sorted wilaya names
- `INSTITUTIONS` — distinct sorted institution names
- `MAJORS` — distinct sorted major names
- `TOTAL` — total program count

---

## BAC Streams (`src/app/lib/streams.ts`)

Six Algerian baccalaureate specializations:

| Code | Name (FR) |
|---|---|
| `SE` | Sciences experimentales |
| `M` | Mathematiques |
| `TM` | Technique mathematique |
| `GE` | Gestion et economie |
| `LP` | Lettres et philosophie |
| `LE` | Langues etrangeres |

Stream inference is **heuristic**: keyword rules map French substrings in the major name to relevant streams (e.g., "medecine" → SE+M, "droit" → LP+GE+LE). Results are cached per major.

---

## Synonym / Query Expansion (`src/app/lib/synonyms.ts`)

### CONCEPTS Array
40 concept families covering:
- **Languages:** Arabic, French, English, Spanish, German, Amazigh, Translation
- **Health:** Medicine, dentistry, pharmacy, veterinary, nursing
- **Engineering:** CS, math, architecture, civil, mechanical, electrical, chemical, industrial, hydraulic, aeronautical, mining
- **Natural Sciences:** Biology, physics, chemistry, geology, agronomy
- **Economics/Law/Politics**
- **Humanities:** Psychology, sociology, history, geography, philosophy, Islamic studies, journalism, library science
- **Arts/Sports**

Each concept has:
- `match[]` — normalized French substrings found in program major names
- `alias[]` — Arabic, French, and slang phrasings students might type (e.g., for medicine: "طب", "الطب", "طبيب", "دكتور", "medecine", "docteur")

### ETB_TAGS Array
Programs at "Ecole Normale Superieure" (ENS) institutions get teacher-role aliases ("استاذ", "معلم", "enseignant", "professeur"), enabling queries like "Arabic teacher" to match ENS Arabic programs.

---

## Internationalization (i18n)

### Architecture
- **Languages:** Arabic (`ar`), French (`fr`), English (`en`) — default is French
- **Types** (`types.ts`): `Lang` type + deeply nested `TranslationTree` interface
- **Engine** (`index.ts`): `t(lang, key, vars?)` — dot-notation key lookup with `{variable}` interpolation

### RTL Support
- Arabic triggers `dir="rtl"` on `<html>`
- Theme CSS switches font family to `--font-ar` (Noto Sans Arabic)
- Sheet component renders on the left for Arabic
- ChevronRight icons use `rtl:rotate-180` for directional flipping

### Usage Pattern
All components receive `lang` as a prop and call `t(lang, "key.path")` for translations. Language is persisted to `localStorage`.

---

## UI Components

### Application Components

| Component | Purpose |
|---|---|
| `Header` | Sticky top bar with logo, 3-language pill toggle, dark mode toggle |
| `SearchBar` | Search input with autocomplete dropdown, full keyboard navigation (arrows/enter/escape) |
| `ProgramCard` | Result card showing major (FR+AR), institution, wilaya, code, streams badge, color-coded cutoff |
| `FilterPanel` | Sidebar with select dropdowns for wilaya, stream, institution + clear button |
| `EmptyState` | Two modes: "start" (initial) or "none" (no results) with "did you mean" suggestion |
| `DetailDrawer` | Full program detail side sheet: priority tiers, suggested streams, institution info, other institutions offering same major |

### shadcn/ui Components
35+ components installed from shadcn/ui. **Actually used by the app:**

| Component | Used In |
|---|---|
| `button` | Header, FilterPanel, DetailDrawer, SearchBar |
| `sheet` | DetailDrawer (modified with `closeLabel` prop for i18n) |
| `select` | FilterPanel |
| `slider` | FilterPanel (minAverage filter, currently disabled) |
| `label` | FilterPanel |
| `separator` | DetailDrawer |
| `utils` (`cn()`) | All components |

**Unused but available:** accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, calendar, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, sidebar, skeleton, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

---

## Styling

### Entry Point (`src/styles/index.css`)
Imports `fonts.css` → `tailwind.css` → `theme.css`.

### Theme (`src/styles/theme.css`)
- **50+ CSS custom properties** covering background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, ring, chart colors
- **Status colors:** `--status-high` (green, ≥15), `--status-medium` (yellow, ≥12), `--status-low` (red, <12) — used for admission cutoff color coding
- **Dark mode:** `.dark` class variant with slate-based dark palette
- **Font system:** `--font-sans` (Inter) for LTR, `--font-ar` (Noto Sans Arabic) for RTL
- **Tailwind v4 integration:** `@theme inline` block maps CSS variables to Tailwind's color system

### Fonts
- **Inter** (400–700) — Latin UI text
- **IBM Plex Sans** (100–700) — Alternate Latin font
- **Cairo** (400–700) — Arabic font alternative
- **Noto Sans Arabic** — Primary Arabic font (loaded via `<link>` in index.html)

---

## Build & Deployment

### Vite Config
- **Plugins:** `figmaAssetResolver` (resolves `figma:asset/` imports), `react` (fast-refresh disabled), `tailwindcss`
- **Path alias:** `@` → `./src`
- **Assets:** SVG and CSV treated as raw imports

### Scripts
| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build via `vite build` |

### Deployment
- **Platform:** Vercel (auto-deploys from `main` branch)
- **Build:** `npm install` → `npm run build`
- **PWA:** Standalone display, blue theme (#2563EB), 512x512 icon
- **Meta:** `robots: noindex, nofollow` (not yet public)

---

## Key Architecture Decisions

1. **No routing** — Single-page with conditional rendering (`searching ? Results : Home`). State managed entirely with React `useState`/`useMemo`.

2. **Offline-first, no backend** — All program data bundled as TypeScript/JSON. Search runs entirely client-side with a pre-computed index.

3. **Generous synonym system** — 40+ concept families map domain terms to Arabic, French, and colloquial search terms. Critical for Algerian students who search in mixed Arabic/French with slang.

4. **University alias enrichment** — Multi-step pipeline generates extensive misspelling-tolerant aliases (vowel drops, letter swaps, abbreviations) enabling fuzzy university name search.

5. **Built-in typo tolerance** — Custom Levenshtein distance with vocabulary from all indexed tokens. Terms 4+ characters are corrected to nearest known word.

6. **Color-coded cutoffs** — `avgTone()` maps admission averages to green (≥15), yellow (≥12), red (<12) visual indicators.

7. **RTL-aware layout** — Language switching changes `document.documentElement.dir`, triggering font changes, sheet positioning, icon flipping, and text alignment.

8. **Shadcn/ui full install** — All 35+ components installed but only ~8 used. Provides comprehensive library ready for future features.

9. **Modified sheet.tsx** — Standard shadcn Sheet modified to accept `closeLabel` prop for i18n support.

10. **Debug helper** — `App.tsx` exposes `window.__last_search_debug__` with latest search inputs and result count for runtime diagnostics.

11. **Pagination** — Results loaded in batches of 40 with a "load more" button (no infinite scroll).

12. **Mobile filter overlay** — Below `lg` breakpoint, filters appear as a modal overlay rather than a sidebar.

13. **Figma Make origin** — Project scaffolded from Figma Make (Figma-to-code tool), evidenced by the `figmaAssetResolver` Vite plugin and package name `@figma/my-make-file`.
