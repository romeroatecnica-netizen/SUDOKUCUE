export type LangCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar' | 'hi' | 'ru' | 'zh' | 'ja';

export interface LocaleMeta {
  code: LangCode;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGS: LocaleMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
];

export interface TranslationBundle {
  seo: {
    title: string;
    description: string;
    howToName: string;
    howToSteps: { name: string; text: string }[];
  };
  nav: {
    play: string;
    duelGuide: string;
    stats: string;
    faq: string;
    languageLabel: string;
  };
  hero: {
    h1: string;
    subtitle: string;
  };
  game: {
    easy: string;
    medium: string;
    hard: string;
    newBoard: string;
    dailyDuel: string;
    printSheet: string;
    soundOn: string;
    soundOff: string;
    boardSeed: string;
    time: string;
    hints: string;
    filled: string;
    score: string;
    conflicts: string;
    normalMode: string;
    notesMode: string;
    erase: string;
    undo: string;
    check: string;
    hintButton: string;
    hintCostLabel: string;
    checkOk: string;
    checkErrors: string;
    solvedBannerTitle: string;
    solvedBannerSub: string;
    pause: string;
    resume: string;
    pausedOverlay: string;
    keyboardTip: string;
  };
  svg: {
    title: string;
    quadrantMap: string;
    duelBenchmark: string;
    you: string;
    target: string;
    openTarget: string;
    remaining: string;
    hinted: string;
  };
  duel: {
    cardTitle: string;
    activeDuelTitle: string;
    openDuelTitle: string;
    challengerLabel: string;
    anonymousChallenger: string;
    roundLabel: string;
    nicknameLabel: string;
    nicknamePlaceholder: string;
    challengeWhatsApp: string;
    copyLink: string;
    copied: string;
    sendRematch: string;
    shareVictoryBack: string;
    playFreshSolo: string;
    beatTargetHint: string;
    liveCompareHint: string;
    outcomeWin: string;
    outcomeTie: string;
    outcomeLoss: string;
    outcomePending: string;
    timeDeltaFaster: string;
    timeDeltaSlower: string;
    timeDeltaEqual: string;
    whatsappMessageSolved: string;
    whatsappMessageOpen: string;
    whatsappMessageRematch: string;
  };
  stats: {
    sectionTitle: string;
    streak: string;
    totalSolved: string;
    duelsWon: string;
    bestTime: string;
    bestScore: string;
    noRecord: string;
    exportJson: string;
    importJson: string;
    importSuccess: string;
    importError: string;
    historyTitle: string;
    historyEmpty: string;
    clearHistory: string;
    dateCol: string;
    diffCol: string;
    timeCol: string;
    hintsCol: string;
    scoreCol: string;
    resultCol: string;
  };
  editorial: {
    guideTitle: string;
    guideLead: string;
    articles: {
      title: string;
      body: string[];
    }[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
    transparencyNotice: string;
    gearTitle: string;
    gearSubtitle: string;
    gearItems: {
      category: string;
      title: string;
      description: string;
      cta: string;
    }[];
  };
  footer: {
    canonicalNote: string;
    privacyNote: string;
  };
  print: {
    subtitle: string;
    instructions: string;
  };
}
