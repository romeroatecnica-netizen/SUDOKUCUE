import type { TranslationBundle } from '../types';

export const de: TranslationBundle = {
  seo: {
    title: 'SudokuCue — Kompetitive Sudoku-Challenge & WhatsApp-Duell',
    description:
      'Fordere Freunde per WhatsApp-Link zum 9×9-Sudoku-Duell heraus. Spielt exakt dasselbe Brett aus der URL und schlagt Zeit, Hinweise und Punkte – 100 % lokal.',
    howToName: 'So sendest und gewinnst du eine Sudoku-Challenge per WhatsApp',
    howToSteps: [
      {
        name: 'Schwierigkeit wählen und 9×9-Sudoku lösen',
        text: 'Wähle Leicht, Mittel oder Schwer und löse das deterministische Rätsel mit Notizmodus und Konfliktanzeige.',
      },
      {
        name: 'Challenge-Link per WhatsApp teilen',
        text: 'Klicke auf Per WhatsApp fordern, um Seed, Schwierigkeit, Sekunden, Hinweise und Punkte in #c= zu kodieren.',
      },
      {
        name: 'Zeiten vergleichen und Revanche senden',
        text: 'Dein Freund spielt dasselbe Brett im Browser, vergleicht Punkte und sendet direkt eine Revanche zurück.',
      },
    ],
  },
  nav: {
    play: 'Duell Spielen',
    duelGuide: 'Duell-Guide',
    stats: 'Rekorde & JSON',
    faq: 'FAQ',
    languageLabel: 'Sprache',
  },
  hero: {
    h1: 'Kompetitive Sudoku-Challenge & WhatsApp-Duell',
    subtitle:
      'Löse ein deterministisches 9×9-Brett, verpacke Zeit, Hinweise und Punkte in einen Link und fordere Freunde per WhatsApp heraus.',
  },
  game: {
    easy: 'Leicht',
    medium: 'Mittel',
    hard: 'Schwer',
    newBoard: 'Neues Brett',
    dailyDuel: 'Tages-Duell',
    printSheet: 'Drucken',
    soundOn: 'Ton An',
    soundOff: 'Stumm',
    boardSeed: 'Brett',
    time: 'Zeit',
    hints: 'Hinweise',
    filled: 'Gelöst',
    score: 'Punkte',
    conflicts: 'Konflikte',
    normalMode: 'Normal',
    notesMode: 'Notizen',
    erase: 'Löschen',
    undo: 'Rückgängig',
    check: 'Prüfen',
    hintButton: 'Hinweis',
    hintCostLabel: '-150 Pkt · +30s',
    checkOk: 'Alle eingetragenen Ziffern stimmen bisher mit der Lösung überein.',
    checkErrors: '{count} Feld(er) stimmen nicht mit der Lösung überein (-40 Pkt je Fehler).',
    solvedBannerTitle: 'Sudoku Gelöst!',
    solvedBannerSub: 'Deine Bestmarke ist bereit zum Teilen per WhatsApp oder Challenge-Link.',
    pause: 'Pause',
    resume: 'Weiter',
    pausedOverlay: 'Timer pausiert — klicke auf Weiter zum Fortsetzen.',
    keyboardTip: 'Tasten: 1–9 Eingabe · Pfeile Bewegen · N Notizen · Z Rückgängig · H Hinweis · Entf Löschen',
  },
  svg: {
    title: 'SudokuCue Duell- & Fortschrittsschema',
    quadrantMap: '3×3-Block-Fortschritt',
    duelBenchmark: 'Zeit- & Punktevergleich',
    you: 'Du',
    target: 'Ziel',
    openTarget: 'Offenes Duell',
    remaining: 'Offen',
    hinted: 'Hinweis',
  },
  duel: {
    cardTitle: 'WhatsApp- & Link-Challenge',
    activeDuelTitle: 'Eingehendes Sudoku-Duell',
    openDuelTitle: 'Geteiltes Brett-Duell',
    challengerLabel: 'Herausforderer',
    anonymousChallenger: 'Freund',
    roundLabel: 'Runde',
    nicknameLabel: 'Dein Name (optional)',
    nicknamePlaceholder: 'z. B. Lukas',
    challengeWhatsApp: 'Per WhatsApp fordern',
    copyLink: 'Challenge-Link kopieren',
    copied: 'Link kopiert',
    sendRematch: 'Revanche senden',
    shareVictoryBack: 'Ergebnis zurücksenden',
    playFreshSolo: 'Duell beenden',
    beatTargetHint: 'Schlage {time} · {hints} Hinweise · {score} Pkt auf exakt diesem Brett.',
    liveCompareHint: 'Identischer Seed geladen. Löse das Brett zum direkten Vergleich.',
    outcomeWin: 'Sieg — Du hast die Challenge geschlagen!',
    outcomeTie: 'Exaktes Unentschieden!',
    outcomeLoss: 'Herausforderer führt in dieser Runde',
    outcomePending: 'Brett gelöst — Bestmarke gespeichert',
    timeDeltaFaster: '{sec}s schneller als der Gegner',
    timeDeltaSlower: '{sec}s hinter dem Gegner',
    timeDeltaEqual: 'Exakt gleiche Zeit',
    whatsappMessageSolved:
      'Ich habe dieses {diff}-SudokuCue-Brett in {time} gelöst ({hints} Hinweise, {score} Pkt). Schaffst du es schneller auf demselben Feld? {url}',
    whatsappMessageOpen:
      'Lass uns exakt dieses {diff}-SudokuCue-Brett um die Wette lösen! Link öffnen: {url}',
    whatsappMessageRematch:
      'SudokuCue Revanche (Runde {round})! Frisches {diff}-Brett bereit—schlag meine Marke: {url}',
  },
  stats: {
    sectionTitle: 'Lokale Rekorde, Duell-Verlauf & JSON-Backup',
    streak: 'Serie',
    totalSolved: 'Gelöst',
    duelsWon: 'Duelle Gewonnen',
    bestTime: 'Bestzeit',
    bestScore: 'Highscore',
    noRecord: '—',
    exportJson: 'JSON Export',
    importJson: 'JSON Import',
    importSuccess: 'Backup erfolgreich importiert.',
    importError: 'Ungültige JSON-Backup-Datei.',
    historyTitle: 'Letzte Spiele & Duelle',
    historyEmpty: 'Löse dein erstes 9×9-Brett oder WhatsApp-Duell, um Zeiten zu speichern.',
    clearHistory: 'Verlauf leeren',
    dateCol: 'Datum',
    diffCol: 'Stufe',
    timeCol: 'Zeit',
    hintsCol: 'Hinweise',
    scoreCol: 'Punkte',
    resultCol: 'Duell',
  },
  editorial: {
    guideTitle: 'So funktionieren kompetitive Sudoku-Challenges per WhatsApp',
    guideLead: 'Messe dich direkt per Link mit Freunden – ohne Registrierung, App-Download oder Server.',
    articles: [
      {
        title: '1. Challenge-Link per WhatsApp senden und Zeit schlagen',
        body: [
          'Jedes SudokuCue-Rätsel entsteht deterministisch aus Seed und Schwierigkeit. Mit einem Klick auf Per WhatsApp fordern werden Seed, Stufe, Sekunden, Hinweise und Punkte in #c= kodiert.',
          'Dein Gegenüber lädt lokal exakt dieselbe 9×9-Vorlage mit eindeutiger Lösung und vergleicht am Ende Zeit, Hinweise und Score.',
        ],
      },
      {
        title: '2. Schneller lösen mit Notizen und systematischem Scannen',
        body: [
          'Beginne mit Cross-Hatching häufiger Ziffern und nutze den Notizmodus (Taste N) für Zweier- und Dreierkandidaten. Beim Eintragen einer Ziffer bereinigt SudokuCue automatisch alle betroffenen Notizen.',
        ],
      },
      {
        title: '3. Duelle gewinnen ohne teure Hinweis-Strafen',
        body: [
          'Jeder Hinweis kostet transparent 150 Punkte (+30s). Ein ruhiger Blick auf fast volle Reihen oder Blöcke spart oft wertvolle Strafpunkte.',
        ],
      },
      {
        title: '4. Schnelle Duell-Ideen für Freunde und Gruppen',
        body: [
          'Startet ein tägliches Mittel-Duell per Tages-Duell oder spielt Best-of-3-Revanchen über den Button Revanche senden.',
        ],
      },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Warum spielen beide genau dasselbe Sudoku ohne Backend?',
        a: 'Der Seed im #c=-URL-Hash erzeugt auf jedem Gerät exakt dieselben Startziffern und die eindeutige Lösung.',
      },
      {
        q: 'Wie wird der Duell-Sieger berechnet?',
        a: 'Basis (1.000 / 1.800 / 2.800) minus 2 Pkt pro Sekunde, 150 Pkt pro Hinweis und 40 Pkt pro Prüffehler. Höhere Punktzahl gewinnt.',
      },
      {
        q: 'Kann ich das Brett drucken oder als JSON sichern?',
        a: 'Ja, über Drucken (@media print) sowie JSON Export/Import im Statistikbereich.',
      },
    ],
    transparencyNotice:
      '100 % clientseitiges kompetitives Sudoku-Duell mit teilbaren WhatsApp-Links. Challenges werden ohne Backend in der URL kodiert, und Zeiten, Serien sowie Notizen laufen lokal ohne KI-API-Aufrufe.',
    gearTitle: 'Empfohlene Sudoku-Bücher & Logik-Zubehör',
    gearSubtitle: 'Ausgewählte Ausstattung für Papier-Training und schnelle Tisch-Duelle.',
    gearItems: [
      {
        category: 'Rätselbücher',
        title: 'Sudoku-Hefte Schwer & Experte',
        description: 'Starkes Papier für saubere Bleistiftnotizen ohne Durchdrücken.',
        cta: 'Bücher ansehen',
      },
      {
        category: 'Gesellschaftsspiele',
        title: 'Logik- & Deduktionsspiele für Gruppen',
        description: 'Kompakte Denkspiele für schnelle Runden mit Freunden.',
        cta: 'Spiele entdecken',
      },
      {
        category: 'Schreibwaren',
        title: '0,5-mm-Präzisions-Druckbleistifte',
        description: 'Feine Minen für klare Kandidatennotizen auf Papier.',
        cta: 'Stifte ansehen',
      },
      {
        category: 'Timer',
        title: 'Digitale Schach- & Rätsel-Tischuhren',
        description: 'Präzise Tischtimer für Papier-Duelle vor Ort.',
        cta: 'Timer ansehen',
      },
    ],
  },
  footer: {
    canonicalNote: 'Kanonische Domain: https://sudokucue.bastelar.com',
    privacyNote: 'Kein Tracking · Nur lokaler Browserspeicher',
  },
  print: {
    subtitle: 'Druckbares 9×9-Challenge-Blatt',
    instructions: 'Fülle jede Reihe, Spalte und jeden 3×3-Block mit den Ziffern 1–9.',
  },
};
