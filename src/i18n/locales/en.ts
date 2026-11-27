import type { TranslationBundle } from '../types';

export const en: TranslationBundle = {
  seo: {
    title: 'SudokuCue — Competitive Sudoku Challenge & WhatsApp Duel Game',
    description:
      'Challenge friends to a 9x9 Sudoku duel via WhatsApp link. Play the exact same board encoded in the URL, beat their time, hints, and score—100% client-side.',
    howToName: 'How to Send and Beat a Sudoku Challenge Link on WhatsApp',
    howToSteps: [
      {
        name: 'Pick difficulty and solve the 9x9 board',
        text: 'Select Easy, Medium, or Hard and solve the deterministic 9x9 Sudoku puzzle using Notes mode and conflict highlights.',
      },
      {
        name: 'Send challenge on WhatsApp or copy link',
        text: 'Generate a URL-encoded #c= challenge link containing the exact puzzle seed, difficulty, seconds, hints used, and final score.',
      },
      {
        name: 'Compare duel metrics and send a rematch',
        text: 'When your friend completes the same board, compare seconds, hints, and points head-to-head and fire back a rematch link.',
      },
    ],
  },
  nav: {
    play: 'Play Duel',
    duelGuide: 'Duel Guide',
    stats: 'Stats & Backup',
    faq: 'FAQ',
    languageLabel: 'Language',
  },
  hero: {
    h1: 'Competitive Sudoku Challenge & WhatsApp Duel',
    subtitle:
      'Solve a deterministic 9×9 board, encode your time, hints, and score into a shareable link, and challenge friends on WhatsApp to beat your mark.',
  },
  game: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    newBoard: 'New Board',
    dailyDuel: 'Daily Duel',
    printSheet: 'Print',
    soundOn: 'Sound On',
    soundOff: 'Muted',
    boardSeed: 'Board',
    time: 'Time',
    hints: 'Hints',
    filled: 'Filled',
    score: 'Score',
    conflicts: 'Conflicts',
    normalMode: 'Normal',
    notesMode: 'Notes',
    erase: 'Erase',
    undo: 'Undo',
    check: 'Check',
    hintButton: 'Hint',
    hintCostLabel: '-150 pts · +30s',
    checkOk: 'All entered digits match the unique solution so far.',
    checkErrors: '{count} cell(s) do not match the solution (-40 pts each).',
    solvedBannerTitle: 'Puzzle Solved!',
    solvedBannerSub: 'Your benchmark is ready to share via WhatsApp or Challenge Link.',
    pause: 'Pause',
    resume: 'Resume',
    pausedOverlay: 'Timer paused — click Resume to continue solving.',
    keyboardTip: 'Keys: 1–9 input · Arrows move · N notes · Z undo · H hint · Del clear',
  },
  svg: {
    title: 'SudokuCue Duel & Progress Schematic',
    quadrantMap: '3×3 Box Completion',
    duelBenchmark: 'Time & Score Benchmark',
    you: 'You',
    target: 'Target',
    openTarget: 'Open Duel',
    remaining: 'Left',
    hinted: 'Hinted',
  },
  duel: {
    cardTitle: 'WhatsApp & Link Challenge',
    activeDuelTitle: 'Incoming Sudoku Duel',
    openDuelTitle: 'Shared Board Duel',
    challengerLabel: 'Challenger',
    anonymousChallenger: 'Friend',
    roundLabel: 'Round',
    nicknameLabel: 'Your Name (optional)',
    nicknamePlaceholder: 'e.g. Alex',
    challengeWhatsApp: 'Challenge on WhatsApp',
    copyLink: 'Copy Challenge Link',
    copied: 'Link Copied',
    sendRematch: 'Send Rematch',
    shareVictoryBack: 'Share Result Back',
    playFreshSolo: 'Exit Duel',
    beatTargetHint: 'Beat {time} · {hints} hints · {score} pts on this exact board.',
    liveCompareHint: 'Same puzzle seed loaded. Finish to compare times or send a rematch.',
    outcomeWin: 'Victory — You Beat the Challenge!',
    outcomeTie: 'Exact Tie — Identical Mark!',
    outcomeLoss: 'Challenger Leads This Round',
    outcomePending: 'Board Completed — Benchmark Locked',
    timeDeltaFaster: '{sec}s faster than challenger',
    timeDeltaSlower: '{sec}s behind challenger',
    timeDeltaEqual: 'Exact same clock time',
    whatsappMessageSolved:
      'I solved this {diff} SudokuCue board in {time} ({hints} hints, {score} pts). Can you beat my time on the exact same grid? {url}',
    whatsappMessageOpen:
      'Let us race on this exact {diff} SudokuCue board! Open the link to start the same puzzle: {url}',
    whatsappMessageRematch:
      'SudokuCue Rematch (Round {round})! Fresh {diff} board ready—see if you can beat my mark: {url}',
  },
  stats: {
    sectionTitle: 'Local Records, Duel History & JSON Backup',
    streak: 'Win Streak',
    totalSolved: 'Solved',
    duelsWon: 'Duels Won',
    bestTime: 'Best Time',
    bestScore: 'Best Score',
    noRecord: '—',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    importSuccess: 'Backup imported successfully.',
    importError: 'Invalid JSON backup file.',
    historyTitle: 'Recent Solves & Duels',
    historyEmpty: 'Complete your first 9×9 board or WhatsApp duel to record your times here.',
    clearHistory: 'Clear History',
    dateCol: 'Date',
    diffCol: 'Difficulty',
    timeCol: 'Time',
    hintsCol: 'Hints',
    scoreCol: 'Score',
    resultCol: 'Duel',
  },
  editorial: {
    guideTitle: 'How Competitive Sudoku Challenges & WhatsApp Duels Work',
    guideLead:
      'Turn solo logic puzzles into instant head-to-head races without creating accounts, installing apps, or sharing personal data.',
    articles: [
      {
        title: '1. Send and Beat a Sudoku Challenge Link on WhatsApp',
        body: [
          'Every board on SudokuCue is generated deterministically from a numeric seed and difficulty level. When you solve a puzzle—or even before you start—clicking Challenge on WhatsApp or Copy Challenge Link packs the seed, difficulty, language, elapsed seconds, hints used, and final score into the #c= fragment of the URL.',
          'When your friend taps that link, their browser reconstructs the exact same 9×9 Sudoku grid locally. No backend server stores your match: the URL itself is the referee. Once they complete the grid, SudokuCue compares your times, hint penalties, and total points side by side and lets them send a fresh rematch link right back.',
        ],
      },
      {
        title: '2. Solve Easy, Medium & Hard Grids Faster Using Notes & Scanning',
        body: [
          'Speed in competitive Sudoku comes from structured scanning rather than guessing. Start with cross-hatching: pick digits that appear frequently on the board and scan pairs of rows and columns inside each 3×3 block to lock in hidden singles immediately.',
          'Switch to Notes mode (shortcut N) whenever a cell drops to two or three candidates. Keeping clean pencil marks lets you spot naked pairs, locked candidates (pointing pairs), and X-patterns across bands. Whenever you place a final digit in Normal mode, SudokuCue automatically clears that digit from conflicting peer notes so your board stays razor sharp.',
        ],
      },
      {
        title: '3. Win Duels by Avoiding Penalized Hints',
        body: [
          'In a close race, accuracy beats panic taps. Each Hint reveals a guaranteed cell value, but carries a transparent penalty of -150 points and +30 seconds impact on your competitive standing. Using Check when unsure also deducts 40 points per incorrect entry.',
          'Before reaching for a hint on Medium or Hard boards, check whether a row or 3×3 block has only two cells missing—or scan your Notes for single-candidate cells. Finishing with 0 hints preserves your full difficulty bonus (1,000 Easy / 1,800 Medium / 2,800 Hard) minus 2 points per second.',
        ],
      },
      {
        title: '4. Quick Duel Formats for Friends, Families & Coworkers',
        body: [
          'Try a Daily Duel coffee break: hit Daily Duel on Medium so everyone plays the same UTC date seed and posts their time in a WhatsApp group chat. Or play Best-of-Three Rematches starting on Easy, stepping up to Medium and Hard using the Send Rematch button after each round.',
        ],
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How does the #c= WhatsApp challenge link guarantee the exact same Sudoku?',
        a: 'SudokuCue uses a seeded deterministic PRNG and uniqueness solver. Encoding the seed and difficulty in the #c= URL hash instructs every browser to generate the identical 9×9 starting clues and unique solution without a server.',
      },
      {
        q: 'Does SudokuCue require login, a backend database, or AI API keys?',
        a: 'No. Everything—puzzle generation, conflict detection, scoring, timers, streaks, and JSON backups—runs 100% locally in your browser with zero external API calls.',
      },
      {
        q: 'How is the competitive duel winner decided?',
        a: 'Final score combines the difficulty base (1,000 Easy, 1,800 Medium, 2,800 Hard) minus 2 points per second, -150 points per hint, and -40 points per Check error. Higher score wins; ties break by faster clock time, then fewer hints.',
      },
      {
        q: 'Can I print a Sudoku challenge on paper or export my history?',
        a: 'Yes. Click Print to output a clean ink-friendly 9×9 sheet with the board seed and challenge target, and use Export JSON / Import JSON in the Stats section to back up or transfer your records.',
      },
      {
        q: 'What does Check do and does Undo cost points?',
        a: 'Undo is completely free and lets you step back through moves and notes. Check verifies your entered digits against the unique solution and deducts 40 points for each incorrect cell found.',
      },
    ],
    transparencyNotice:
      '100% client-side competitive Sudoku challenge game with shareable WhatsApp links. Challenges are encoded in the URL without a backend, and all times, streaks, and notes run locally in your browser without AI API calls.',
    gearTitle: 'Recommended Paper Sudoku & Logic Gear',
    gearSubtitle: 'Curated tabletop essentials for offline practice, group puzzle nights, and timed sprints.',
    gearItems: [
      {
        category: 'Puzzle Books',
        title: 'Large-Print Hard & Expert Sudoku Notebooks',
        description: 'Thick 120gsm lay-flat puzzle books designed for pencil marks without bleed-through.',
        cta: 'Browse Sudoku Books',
      },
      {
        category: 'Group Games',
        title: 'Competitive Deduction & Logic Board Games',
        description: 'Fast-paced pattern and deduction tabletop games built for 2–6 friends.',
        cta: 'Explore Logic Games',
      },
      {
        category: 'Stationery',
        title: '0.5mm Precision Drafting Mechanical Pencils',
        description: 'Fine-tip mechanical pencils with clean erasers for crisp candidate notes on paper.',
        cta: 'View Precision Pencils',
      },
      {
        category: 'Timing',
        title: 'Tabletop Digital Duel & Chess Timers',
        description: 'Tactile desk timers for head-to-head paper Sudoku sprints and club nights.',
        cta: 'Check Desk Timers',
      },
    ],
  },
  footer: {
    canonicalNote: 'Canonical domain: https://sudokucue.bastelar.com',
    privacyNote: 'Zero tracking · Local browser storage only',
  },
  print: {
    subtitle: 'Printable 9×9 Challenge Sheet',
    instructions: 'Fill every row, column, and 3×3 box with digits 1–9 without repeating.',
  },
};
