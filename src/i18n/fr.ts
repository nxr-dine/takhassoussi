import type { TranslationTree } from "./types";

export const fr: TranslationTree = {
  app: {
    name: "تخصصي",
    tagline: "Découvrez votre spécialité, construisez votre avenir.",
  },
  navigation: {
    backHome: "Accueil",
    themeToggle: "Basculer le thème",
    languageSelector: "Sélecteur de langue",
    toggleSidebar: "Basculer la barre latérale",
    sidebarTitle: "Barre latérale",
    sidebarDescription: "Affiche la barre latérale mobile.",
  },
  languageSwitcher: {
    french: "🇫🇷 Français",
    english: "🇬🇧 English",
    arabic: "🇩🇿 العربية",
  },
  search: {
    placeholder: "Rechercher une spécialité en arabe ou en français...",
    submit: "Rechercher",
    clear: "Effacer la recherche",
    examplesLabel: "Exemples :",
    examples: ["Informatique", "طب", "Architecture", "Langue anglaise", "استاذ لغة عربية"],
    suggestions: {
      programsAt: "programmes",
    },
  },
  home: {
    title: "Trouvez votre spécialité universitaire",
    subtitle:
      "Recherchez parmi {count} programmes universitaires algériens, leurs moyennes d'admission et priorités par filière du BAC.",
  },
  results: {
    count: "{count} résultats",
    countOne: "{count} résultat",
    loadMore: "Afficher plus",
  },
  filters: {
    title: "Filtres",
    wilaya: "Wilaya",
    major: "Spécialité",
    institution: "Établissement",
    stream: "Filière BAC",
    minAverage: "Moyenne minimale",
    allWilayas: "Toutes les wilayas",
    allMajors: "Toutes les spécialités",
    allInstitutions: "Tous les établissements",
    allStreams: "Toutes les filières",
    clear: "Réinitialiser",
  },
  sorting: {
    relevance: "Pertinence",
    averageAsc: "Moyenne ↑",
    averageDesc: "Moyenne ↓",
  },
  emptyState: {
    searchTitle: "Commencez votre recherche",
    searchBody: "Tapez le nom d'une spécialité pour voir les établissements et moyennes.",
    noResultsTitle: "Aucun résultat trouvé",
    noResultsBody: "Essayez une autre orthographe en arabe ou en français.",
    didYouMean: "Vouloir dire :",
  },
  admission: {
    session: "Session BAC 2025",
    priorityMap: "Priorités d'admission",
    priority: "Priorité",
    priorityNote:
      "Min 1 / 2 / 3 correspondent aux moyennes minimales par ordre de priorité d'affectation.",
    suggestedStreams: "Filières BAC conseillées",
    noAverage: "Non spécifiée",
    cutoff: "Moyenne d'admission",
    historicalCutoff: "Moyenne historique",
    chanceHigh: "Forte chance",
    chanceMedium: "Chance moyenne",
    chanceLow: "Faible chance",
    roundLabels: {
      first: "Min 1",
      second: "Min 2",
      third: "Min 3",
    },
  },
  details: {
    institution: "Établissement",
    wilaya: "Wilaya",
    code: "Code",
    otherInstitutions: "Autres établissements proposant cette spécialité",
  },
  contact: {
    label: "Contactez-nous",
  },
  command: {
    title: "Palette de commandes",
    description: "Rechercher une commande à exécuter...",
  },
  common: {
    close: "Fermer",
  },
};
