import type { TranslationTree } from "./types";

export const en: TranslationTree = {
  app: {
    name: "تخصصي",
    tagline: "Discover your major, build your future.",
  },
  navigation: {
    backHome: "Home",
    themeToggle: "Toggle theme",
    languageSelector: "Language selector",
    toggleSidebar: "Toggle sidebar",
    sidebarTitle: "Sidebar",
    sidebarDescription: "Displays the mobile sidebar.",
  },
  languageSwitcher: {
    french: "🇫🇷 Français",
    english: "🇬🇧 English",
    arabic: "🇩🇿 العربية",
  },
  search: {
    placeholder: "Search a major in Arabic or French...",
    submit: "Search",
    clear: "Clear search",
    examplesLabel: "Examples:",
    examples: ["Computer Science", "Medicine", "Architecture", "English Language", "Arabic Teacher"],
    suggestions: {
      programsAt: "programs",
    },
  },
  home: {
    title: "Find your university major",
    subtitle:
      "Search across {count} Algerian university programs, their admission averages, and BAC stream priorities.",
  },
  results: {
    count: "{count} results",
    countOne: "{count} result",
    loadMore: "Show more",
  },
  filters: {
    title: "Filters",
    wilaya: "Wilaya",
    major: "Major",
    institution: "Institution",
    stream: "BAC stream",
    minAverage: "Minimum average",
    allWilayas: "All wilayas",
    allMajors: "All majors",
    allInstitutions: "All institutions",
    allStreams: "All streams",
    clear: "Reset",
  },
  sorting: {
    relevance: "Relevance",
    averageAsc: "Average ↑",
    averageDesc: "Average ↓",
  },
  emptyState: {
    searchTitle: "Start your search",
    searchBody: "Type a major name to see institutions and admission averages.",
    noResultsTitle: "No results found",
    noResultsBody: "Try another spelling in Arabic or French.",
    didYouMean: "Did you mean:",
  },
  admission: {
    session: "BAC 2025 session",
    priorityMap: "Admission priorities",
    priority: "Priority",
    priorityNote:
      "Min 1 / 2 / 3 are the minimum averages in order of assignment priority.",
    suggestedStreams: "Suggested BAC streams",
    noAverage: "Not specified",
    cutoff: "Admission average",
    historicalCutoff: "Historical average",
    chanceHigh: "High chance",
    chanceMedium: "Medium chance",
    chanceLow: "Low chance",
    roundLabels: {
      first: "Min 1",
      second: "Min 2",
      third: "Min 3",
    },
  },
  details: {
    institution: "Institution",
    wilaya: "Wilaya",
    code: "Code",
    otherInstitutions: "Other institutions offering this major",
  },
  contact: {
    label: "Contact us",
  },
  command: {
    title: "Command palette",
    description: "Search for a command to run...",
  },
  common: {
    close: "Close",
  },
};
