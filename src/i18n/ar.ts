import type { TranslationTree } from "./types";

export const ar: TranslationTree = {
  app: {
    name: "تخصصي",
    tagline: "اكتشف تخصصك، وابنِ مستقبلك",
  },
  navigation: {
    backHome: "الرئيسية",
    themeToggle: "تبديل المظهر",
    languageSelector: "محدد اللغة",
    toggleSidebar: "تبديل الشريط الجانبي",
    sidebarTitle: "الشريط الجانبي",
    sidebarDescription: "يعرض الشريط الجانبي للهواتف.",
  },
  languageSwitcher: {
    french: "🇫🇷 Français",
    english: "🇬🇧 English",
    arabic: "🇩🇿 العربية",
  },
  search: {
    placeholder: "ابحث عن تخصص بالعربية أو بالفرنسية...",
    submit: "بحث",
    clear: "مسح البحث",
    examplesLabel: "أمثلة:",
    examples: ["الإعلام الآلي", "الطب", "الهندسة المعمارية", "اللغة الإنجليزية", "أستاذ لغة عربية"],
    suggestions: {
      programsAt: "تخصص",
    },
  },
  home: {
    title: "ابحث عن تخصصك الجامعي",
    subtitle: "ابحث ضمن {count} تخصص جامعي جزائري، معدلات القبول وأولويات القبول حسب شعبة البكالوريا.",
  },
  results: {
    count: "{count} نتيجة",
    countOne: "{count} نتيجة",
    loadMore: "عرض المزيد",
  },
  filters: {
    title: "التصفية",
    wilaya: "الولاية",
    major: "التخصص",
    institution: "المؤسسة",
    stream: "شعبة البكالوريا",
    minAverage: "المعدل الأدنى",
    allWilayas: "كل الولايات",
    allMajors: "كل التخصصات",
    allInstitutions: "كل المؤسسات",
    allStreams: "كل الشعب",
    clear: "إعادة تعيين",
  },
  sorting: {
    relevance: "الصلة",
    averageAsc: "المعدل ↑",
    averageDesc: "المعدل ↓",
  },
  emptyState: {
    searchTitle: "ابدأ البحث",
    searchBody: "اكتب اسم تخصص لعرض المؤسسات ومعدلات القبول.",
    noResultsTitle: "لا توجد نتائج",
    noResultsBody: "جرّب كتابة أخرى بالعربية أو بالفرنسية.",
    didYouMean: "هل تقصد:",
  },
  admission: {
    session: "دورة بكالوريا 2025",
    priorityMap: "أولويات القبول",
    priority: "الأولوية",
    priorityNote: "Min 1 / 2 / 3 تمثل المعدلات الدنيا حسب ترتيب أولوية التوجيه.",
    suggestedStreams: "الشعب المقترحة",
    noAverage: "غير محدد",
    cutoff: "معدل القبول",
    historicalCutoff: "المعدل التاريخي",
    chanceHigh: "فرصة مرتفعة",
    chanceMedium: "فرصة متوسطة",
    chanceLow: "فرصة منخفضة",
    roundLabels: {
      first: "Min 1",
      second: "Min 2",
      third: "Min 3",
    },
  },
  details: {
    institution: "المؤسسة",
    wilaya: "الولاية",
    code: "الرمز",
    otherInstitutions: "مؤسسات أخرى تقترح هذا التخصص",
  },
  contact: {
    label: "تواصل معنا",
  },
  command: {
    title: "لوحة الأوامر",
    description: "ابحث عن أمر لتنفيذه...",
  },
  common: {
    close: "إغلاق",
  },
};
