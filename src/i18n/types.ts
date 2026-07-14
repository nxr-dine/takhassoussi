export type Lang = "fr" | "en" | "ar";

export type TranslationTree = {
  app: {
    name: string;
    tagline: string;
  };
  navigation: {
    backHome: string;
    themeToggle: string;
    languageSelector: string;
    toggleSidebar: string;
    sidebarTitle: string;
    sidebarDescription: string;
  };
  languageSwitcher: {
    french: string;
    english: string;
    arabic: string;
  };
  search: {
    placeholder: string;
    submit: string;
    clear: string;
    examplesLabel: string;
    examples: string[];
    suggestions: {
      programsAt: string;
    };
  };
  home: {
    title: string;
    subtitle: string;
  };
  results: {
    count: string;
    countOne: string;
    loadMore: string;
  };
  filters: {
    title: string;
    wilaya: string;
    major: string;
    institution: string;
    stream: string;
    minAverage: string;
    allWilayas: string;
    allMajors: string;
    allInstitutions: string;
    allStreams: string;
    clear: string;
  };
  sorting: {
    relevance: string;
    averageAsc: string;
    averageDesc: string;
  };
  emptyState: {
    searchTitle: string;
    searchBody: string;
    noResultsTitle: string;
    noResultsBody: string;
    didYouMean: string;
  };
  admission: {
    session: string;
    priorityMap: string;
    priority: string;
    priorityNote: string;
    suggestedStreams: string;
    noAverage: string;
    cutoff: string;
    historicalCutoff: string;
    chanceHigh: string;
    chanceMedium: string;
    chanceLow: string;
    roundLabels: {
      first: string;
      second: string;
      third: string;
    };
  };
  details: {
    institution: string;
    wilaya: string;
    code: string;
    otherInstitutions: string;
  };
  contact: {
    label: string;
  };
  command: {
    title: string;
    description: string;
  };
  common: {
    close: string;
  };
};
