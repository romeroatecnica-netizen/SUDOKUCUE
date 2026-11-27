import {
  Calendar,
  CheckCircle2,
  Eraser,
  Lightbulb,
  Pause,
  Pencil,
  Play,
  Printer,
  RefreshCw,
  Undo2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AdSlot } from './components/AdSlot';
import { DuelPanel } from './components/DuelPanel';
import { EditorialSeoSection } from './components/EditorialSeoSection';
import { StatsAndBackup } from './components/StatsAndBackup';
import { SudokuBoard } from './components/SudokuBoard';
import { SudokuCueSvg } from './components/SudokuCueSvg';
import { applySeoMetadata, CANONICAL_ORIGIN } from './config/seo';
import {
  decodeChallengeHash,
  evaluateDuelOutcome,
  type ChallengePayload,
} from './engine/challenge';
import { soundFx } from './engine/sound';
import {
  loadStoredData,
  saveStoredData,
  type MatchHistoryEntry,
  type StoredData,
} from './engine/storage';
import {
  buildInitialCells,
  calculateScore,
  cleanPeerNotes,
  createRandomSeed,
  formatTime,
  generatePuzzle,
  getConflicts,
  getDailySeed,
  isBoardSolved,
  type CellState,
  type Difficulty,
} from './engine/sudoku';
import { detectInitialLang, formatMessage, getTranslations } from './i18n';
import { SUPPORTED_LANGS, type LangCode } from './i18n/types';

interface GameSnapshot {
  cells: CellState[];
}

export default function App() {
  const initialStored = useMemo(() => loadStoredData(), []);
  const initialChallenge = useMemo(
    () => (typeof window !== 'undefined' ? decodeChallengeHash(window.location.hash) : null),
    []
  );

  const [lang, setLang] = useState<LangCode>(() =>
    detectInitialLang(initialStored.preferredLang, initialChallenge?.l)
  );
  const t = useMemo(() => getTranslations(lang), [lang]);

  const [stored, setStored] = useState<StoredData>(initialStored);

  // Determine starting puzzle: URL challenge > saved active game > fresh medium puzzle
  const initialBoardSetup = useMemo(() => {
    if (initialChallenge) {
      const puzzle = generatePuzzle(initialChallenge.d, initialChallenge.s);
      return {
        seed: puzzle.seed,
        difficulty: puzzle.difficulty,
        solution: puzzle.solution,
        cells: buildInitialCells(puzzle.givens),
        elapsedSec: 0,
        hintsUsed: 0,
        checkMistakes: 0,
        completed: false,
        finalScore: null as number | null,
        challenge: initialChallenge,
      };
    }

    if (initialStored.activeGame) {
      const saved = initialStored.activeGame;
      const puzzle = generatePuzzle(saved.difficulty, saved.seed);
      return {
        seed: puzzle.seed,
        difficulty: puzzle.difficulty,
        solution: puzzle.solution,
        cells: saved.cells,
        elapsedSec: saved.elapsedSec,
        hintsUsed: saved.hintsUsed,
        checkMistakes: saved.checkMistakes,
        completed: saved.completed,
        finalScore: saved.finalScore,
        challenge: saved.challenge,
      };
    }

    const seed = createRandomSeed();
    const puzzle = generatePuzzle('medium', seed);
    return {
      seed: puzzle.seed,
      difficulty: puzzle.difficulty,
      solution: puzzle.solution,
      cells: buildInitialCells(puzzle.givens),
      elapsedSec: 0,
      hintsUsed: 0,
      checkMistakes: 0,
      completed: false,
      finalScore: null as number | null,
      challenge: null as ChallengePayload | null,
    };
  }, [initialChallenge, initialStored]);

  const [seed, setSeed] = useState<number>(initialBoardSetup.seed);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialBoardSetup.difficulty);
  const [solution, setSolution] = useState<number[]>(initialBoardSetup.solution);
  const [cells, setCells] = useState<CellState[]>(initialBoardSetup.cells);
  const [historyStack, setHistoryStack] = useState<GameSnapshot[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [notesMode, setNotesMode] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(initialBoardSetup.elapsedSec);
  const [hintsUsed, setHintsUsed] = useState<number>(initialBoardSetup.hintsUsed);
  const [checkMistakes, setCheckMistakes] = useState<number>(initialBoardSetup.checkMistakes);
  const [paused, setPaused] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(initialBoardSetup.completed);
  const [finalScore, setFinalScore] = useState<number | null>(initialBoardSetup.finalScore);
  const [challenge, setChallenge] = useState<ChallengePayload | null>(initialBoardSetup.challenge);
  const [wrongIndices, setWrongIndices] = useState<Set<number>>(new Set());
  const [checkFeedback, setCheckFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(
    null
  );

  const completionRecordedRef = useRef<boolean>(initialBoardSetup.completed);

  // Apply SEO tags + <html lang/dir> whenever language changes
  useEffect(() => {
    applySeoMetadata(lang, t);
  }, [lang, t]);

  // Sync URL query param & localStorage on manual language selection
  const handleLanguageChange = (newLang: LangCode) => {
    setLang(newLang);
    setStored((prev) => {
      const next = { ...prev, preferredLang: newLang };
      saveStoredData(next);
      return next;
    });
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newLang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', newLang);
      }
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  };

  // Start a specific puzzle
  const loadNewBoard = useCallback(
    (nextDiff: Difficulty, nextSeed: number, nextChallenge: ChallengePayload | null = null) => {
      const puzzle = generatePuzzle(nextDiff, nextSeed);
      setSeed(puzzle.seed);
      setDifficulty(puzzle.difficulty);
      setSolution(puzzle.solution);
      setCells(buildInitialCells(puzzle.givens));
      setHistoryStack([]);
      setSelectedIdx(null);
      setNotesMode(false);
      setElapsedSec(0);
      setHintsUsed(0);
      setCheckMistakes(0);
      setPaused(false);
      setCompleted(false);
      setFinalScore(null);
      setChallenge(nextChallenge);
      setWrongIndices(new Set());
      setCheckFeedback(null);
      completionRecordedRef.current = false;

      if (!nextChallenge && typeof window !== 'undefined' && window.location.hash.includes('c=')) {
        const url = new URL(window.location.href);
        url.hash = '';
        window.history.replaceState({}, '', `${url.pathname}${url.search}`);
      }
    },
    []
  );

  // Handle #c= hash changes if user pastes or navigates to a challenge link
  useEffect(() => {
    const onHashChange = () => {
      const parsed = decodeChallengeHash(window.location.hash);
      if (parsed) {
        loadNewBoard(parsed.d, parsed.s, parsed);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [loadNewBoard]);

  // Game clock
  useEffect(() => {
    if (paused || completed) return;
    const id = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [paused, completed]);

  // Persist active game & stats cleanly
  useEffect(() => {
    setStored((prev) => {
      const next: StoredData = {
        ...prev,
        activeGame: {
          seed,
          difficulty,
          cells,
          elapsedSec,
          hintsUsed,
          checkMistakes,
          completed,
          finalScore,
          challenge,
        },
      };
      saveStoredData(next);
      return next;
    });
  }, [seed, difficulty, cells, elapsedSec, hintsUsed, checkMistakes, completed, finalScore, challenge]);

  const conflicts = useMemo(() => getConflicts(cells), [cells]);
  const liveScore = useMemo(
    () => finalScore ?? calculateScore(difficulty, elapsedSec, hintsUsed, checkMistakes),
    [finalScore, difficulty, elapsedSec, hintsUsed, checkMistakes]
  );
  const filledCount = useMemo(
    () => cells.reduce((acc, c) => acc + (c.value !== 0 ? 1 : 0), 0),
    [cells]
  );

  // Digit counts for keypad completion cue
  const digitCounts = useMemo(() => {
    const counts = new Array<number>(10).fill(0);
    for (const c of cells) {
      if (c.value >= 1 && c.value <= 9) counts[c.value]++;
    }
    return counts;
  }, [cells]);

  // Record completion stats & history once
  const completePuzzle = useCallback(
    (solvedCells: CellState[], currentHints: number, currentMistakes: number) => {
      if (completionRecordedRef.current) return;
      completionRecordedRef.current = true;

      const computedScore = calculateScore(difficulty, elapsedSec, currentHints, currentMistakes);
      setCompleted(true);
      setFinalScore(computedScore);
      setWrongIndices(new Set());
      setCheckFeedback(null);
      soundFx.victory(stored.muted);

      const duelOutcome = challenge
        ? evaluateDuelOutcome(elapsedSec, currentHints, computedScore, challenge)
        : undefined;

      const entry: MatchHistoryEntry = {
        id: `${Date.now()}-${seed}`,
        dateIso: new Date().toISOString(),
        difficulty,
        seed,
        timeSec: elapsedSec,
        hintsUsed: currentHints,
        score: computedScore,
        ...(duelOutcome ? { duelOutcome } : {}),
        ...(challenge?.n ? { opponentName: challenge.n } : {}),
        ...(challenge ? { opponentTimeSec: challenge.t, opponentScore: challenge.p } : {}),
      };

      setStored((prev) => {
        const prevBest = prev.best[difficulty];
        const nextBest = {
          bestTimeSec: prevBest ? Math.min(prevBest.bestTimeSec, elapsedSec) : elapsedSec,
          bestScore: prevBest ? Math.max(prevBest.bestScore, computedScore) : computedScore,
          solvedCount: (prevBest?.solvedCount ?? 0) + 1,
        };
        const next: StoredData = {
          ...prev,
          streak: prev.streak + 1,
          totalSolved: prev.totalSolved + 1,
          duelsWon: prev.duelsWon + (duelOutcome === 'win' ? 1 : 0),
          best: {
            ...prev.best,
            [difficulty]: nextBest,
          },
          history: [entry, ...prev.history].slice(0, 50),
        };
        saveStoredData(next);
        return next;
      });
    },
    [difficulty, elapsedSec, seed, challenge, stored.muted]
  );

  // Input a digit (1..9) or erase (0)
  const applyDigit = useCallback(
    (digit: number) => {
      if (paused || completed || selectedIdx === null) return;
      const target = cells[selectedIdx];
      if (!target || target.given !== 0 || target.hinted) return;

      // Clear check warning on edited cell
      setWrongIndices((prev) => {
        if (!prev.has(selectedIdx)) return prev;
        const copy = new Set(prev);
        copy.delete(selectedIdx);
        return copy;
      });
      setCheckFeedback(null);

      setHistoryStack((prev) => [...prev.slice(-49), { cells }]);

      let nextCells: CellState[];
      if (notesMode && digit !== 0) {
        soundFx.note(stored.muted);
        nextCells = cells.map((cell, idx) => {
          if (idx !== selectedIdx) return cell;
          if (cell.value !== 0) return cell;
          const exists = cell.notes.includes(digit);
          const nextNotes = exists
            ? cell.notes.filter((n) => n !== digit)
            : [...cell.notes, digit].sort((a, b) => a - b);
          return { ...cell, notes: nextNotes };
        });
        setCells(nextCells);
        return;
      }

      if (digit === 0) {
        soundFx.tap(stored.muted);
        nextCells = cells.map((cell, idx) =>
          idx === selectedIdx ? { ...cell, value: 0, notes: [] } : cell
        );
        setCells(nextCells);
        return;
      }

      // Normal value placement
      const placedValue = target.value === digit ? 0 : digit;
      nextCells = cells.map((cell, idx) =>
        idx === selectedIdx ? { ...cell, value: placedValue, notes: [] } : cell
      );

      if (placedValue !== 0) {
        nextCells = cleanPeerNotes(nextCells, selectedIdx, placedValue);
        const nextConflicts = getConflicts(nextCells);
        if (nextConflicts.has(selectedIdx)) {
          soundFx.conflict(stored.muted);
        } else {
          soundFx.tap(stored.muted);
        }
      } else {
        soundFx.tap(stored.muted);
      }

      setCells(nextCells);

      if (placedValue !== 0 && isBoardSolved(nextCells, solution)) {
        completePuzzle(nextCells, hintsUsed, checkMistakes);
      }
    },
    [
      paused,
      completed,
      selectedIdx,
      cells,
      notesMode,
      stored.muted,
      solution,
      completePuzzle,
      hintsUsed,
      checkMistakes,
    ]
  );

  const handleUndo = useCallback(() => {
    if (paused || completed || historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack((s) => s.slice(0, -1));
    setCells(prev.cells);
    setWrongIndices(new Set());
    setCheckFeedback(null);
    soundFx.tap(stored.muted);
  }, [paused, completed, historyStack, stored.muted]);

  const handleHint = useCallback(() => {
    if (paused || completed) return;

    // Pick selected empty/incorrect cell, or first empty cell
    let targetIdx: number | null = null;
    if (selectedIdx !== null) {
      const sel = cells[selectedIdx];
      if (sel && sel.given === 0 && sel.value !== solution[selectedIdx]) {
        targetIdx = selectedIdx;
      }
    }
    if (targetIdx === null) {
      const candidateIdx = cells.findIndex((c, i) => c.given === 0 && c.value !== solution[i]);
      if (candidateIdx !== -1) targetIdx = candidateIdx;
    }
    if (targetIdx === null) return;

    setHistoryStack((prev) => [...prev.slice(-49), { cells }]);
    const correctDigit = solution[targetIdx];
    let nextCells = cells.map((c, idx) =>
      idx === targetIdx ? { ...c, value: correctDigit, notes: [], hinted: true } : c
    );
    nextCells = cleanPeerNotes(nextCells, targetIdx, correctDigit);

    const nextHints = hintsUsed + 1;
    setCells(nextCells);
    setSelectedIdx(targetIdx);
    setHintsUsed(nextHints);
    setWrongIndices((prev) => {
      if (!prev.has(targetIdx!)) return prev;
      const copy = new Set(prev);
      copy.delete(targetIdx!);
      return copy;
    });
    setCheckFeedback(null);
    soundFx.hint(stored.muted);

    if (isBoardSolved(nextCells, solution)) {
      completePuzzle(nextCells, nextHints, checkMistakes);
    }
  }, [
    paused,
    completed,
    selectedIdx,
    cells,
    solution,
    hintsUsed,
    stored.muted,
    completePuzzle,
    checkMistakes,
  ]);

  const handleCheck = useCallback(() => {
    if (paused || completed) return;
    const wrong = new Set<number>();
    for (let i = 0; i < 81; i++) {
      const c = cells[i];
      if (c.given === 0 && c.value !== 0 && c.value !== solution[i]) {
        wrong.add(i);
      }
    }
    setWrongIndices(wrong);
    if (wrong.size === 0) {
      setCheckFeedback({ kind: 'ok', text: t.game.checkOk });
      soundFx.tap(stored.muted);
    } else {
      setCheckMistakes((prev) => prev + wrong.size);
      setCheckFeedback({
        kind: 'err',
        text: formatMessage(t.game.checkErrors, { count: wrong.size }),
      });
      soundFx.conflict(stored.muted);
    }
  }, [paused, completed, cells, solution, t.game.checkOk, t.game.checkErrors, stored.muted]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        applyDigit(Number(e.key));
        return;
      }
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault();
        applyDigit(0);
        return;
      }
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setNotesMode((m) => !m);
        return;
      }
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        handleUndo();
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handleHint();
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setSelectedIdx((prev) => {
          const curr = prev ?? 0;
          const r = Math.floor(curr / 9);
          const c = curr % 9;
          if (e.key === 'ArrowUp') return ((r + 8) % 9) * 9 + c;
          if (e.key === 'ArrowDown') return ((r + 1) % 9) * 9 + c;
          if (e.key === 'ArrowLeft') return r * 9 + ((c + 8) % 9);
          return r * 9 + ((c + 1) % 9);
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [applyDigit, handleUndo, handleHint]);

  const handleToggleMute = () => {
    setStored((prev) => {
      const next = { ...prev, muted: !prev.muted };
      saveStoredData(next);
      return next;
    });
  };

  const handlePlayerNameChange = (name: string) => {
    setStored((prev) => {
      const next = { ...prev, playerName: name.slice(0, 20) };
      saveStoredData(next);
      return next;
    });
  };

  const handleStartRematch = (newSeed: number, nextRound: number) => {
    loadNewBoard(difficulty, newSeed, {
      v: 1,
      s: newSeed,
      d: difficulty,
      l: lang,
      t: null,
      h: 0,
      p: null,
      ...(stored.playerName.trim() ? { n: stored.playerName.trim() } : {}),
      r: nextRound,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="no-print bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#play"
            className="font-display text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            SudokuCue
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#play"
              className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.nav.play}
            </a>
            <a
              href="#duel-guide"
              className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.nav.duelGuide}
            </a>
            <a
              href="#stats"
              className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.nav.stats}
            </a>
            <a
              href="#faq"
              className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Instant 10-Language Selector) */}
          <div className="flex items-center shrink-0">
            <select
              aria-label={t.nav.languageLabel}
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value as LangCode)}
              className="px-3 py-1.5 text-sm font-medium text-slate-800 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] cursor-pointer whitespace-nowrap shrink-0"
            >
              {SUPPORTED_LANGS.map((loc) => (
                <option key={loc.code} value={loc.code}>
                  {loc.nativeName} ({loc.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="play" className="flex-1">
        {/* Compact Hero Header (hidden on print) */}
        <section className="no-print max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-4">
          <div className="max-w-3xl space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              {t.hero.h1}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Print Header (only visible on @media print) */}
        <div className="hidden print-only max-w-[520px] mx-auto pb-4 border-b border-slate-300 mb-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold text-black">
              SudokuCue — {t.print.subtitle}
            </h2>
            <span className="font-mono-tabular text-xs text-slate-700">
              {t.game[difficulty]} · #{seed}
            </span>
          </div>
          <p className="text-xs text-slate-700 mt-1">{t.print.instructions}</p>
          {challenge && challenge.t !== null && (
            <p className="text-xs font-semibold text-black mt-1 tabular-nums">
              {t.duel.challengerLabel}: {challenge.n || t.duel.anonymousChallenger} —{' '}
              {formatTime(challenge.t)} · {challenge.h} {t.game.hints} · {challenge.p ?? 0} pts
            </p>
          )}
        </div>

        {/* Workspace Toolbar & HUD */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <div className="no-print bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
            {/* Difficulty Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] border border-slate-200 rounded-lg">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
                const active = difficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => loadNewBoard(diff, createRandomSeed(), null)}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1E40AF] text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {t.game[diff]}
                  </button>
                );
              })}
            </div>

            {/* Utility Board Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadNewBoard(difficulty, createRandomSeed(), null)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.game.newBoard}</span>
              </button>

              <button
                type="button"
                onClick={() => loadNewBoard(difficulty, getDailySeed(difficulty), null)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#D97706] bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.game.dailyDuel}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.game.printSheet}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={stored.muted ? t.game.soundOff : t.game.soundOn}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {stored.muted ? (
                  <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {stored.muted ? t.game.soundOff : t.game.soundOn}
                </span>
              </button>
            </div>
          </div>

          {/* 2-Column Main Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: HUD + 9x9 Board + Keypad Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* Unboxed Numeric HUD Strip (tabular-nums) */}
              <div className="no-print bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-5 sm:gap-7 tabular-nums">
                  <div>
                    <div className="text-xs text-slate-500">{t.game.time}</div>
                    <div className="font-mono-tabular text-lg font-bold text-slate-900">
                      {formatTime(elapsedSec)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{t.game.hints}</div>
                    <div className="font-mono-tabular text-lg font-bold text-[#D97706]">
                      {hintsUsed}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{t.game.filled}</div>
                    <div className="font-mono-tabular text-lg font-bold text-slate-900">
                      {filledCount}/81
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{t.game.score}</div>
                    <div className="font-mono-tabular text-lg font-bold text-[#1E40AF]">
                      {liveScore}
                    </div>
                  </div>
                  {conflicts.size > 0 && (
                    <div>
                      <div className="text-xs text-rose-600">{t.game.conflicts}</div>
                      <div className="font-mono-tabular text-lg font-bold text-rose-700">
                        {conflicts.size}
                      </div>
                    </div>
                  )}
                </div>

                {!completed && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {paused ? (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.game.resume}</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.game.pause}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Solved Solo Banner */}
              {completed && !challenge && (
                <div
                  role="status"
                  className="no-print bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-display text-sm font-bold text-slate-900">
                      {t.game.solvedBannerTitle}
                    </div>
                    <div className="text-xs text-slate-700">{t.game.solvedBannerSub}</div>
                  </div>
                </div>
              )}

              {/* Check Feedback */}
              {checkFeedback && (
                <div
                  role="status"
                  className={`no-print rounded-xl px-4 py-2.5 border text-xs sm:text-sm font-medium ${
                    checkFeedback.kind === 'ok'
                      ? 'bg-emerald-50 border-emerald-200 text-[#059669]'
                      : 'bg-rose-50 border-rose-200 text-rose-700'
                  }`}
                >
                  {checkFeedback.text}
                </div>
              )}

              {/* 9x9 Sudoku Grid */}
              <SudokuBoard
                cells={cells}
                selectedIdx={selectedIdx}
                conflicts={conflicts}
                wrongIndices={wrongIndices}
                paused={paused}
                completed={completed}
                pausedLabel={t.game.pausedOverlay}
                onSelectCell={(idx) => setSelectedIdx(idx)}
                onResume={() => setPaused(false)}
              />

              {/* Controls & Number Pad */}
              <div className="no-print max-w-[468px] mx-auto space-y-3">
                {/* Action Row: Normal/Notes, Undo, Erase, Check, Hint */}
                <div className="grid grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => setNotesMode((m) => !m)}
                    aria-pressed={notesMode}
                    className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                      notesMode
                        ? 'bg-[#D97706] text-white border-[#D97706]'
                        : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-slate-50'
                    }`}
                  >
                    <Pencil className="w-4 h-4" aria-hidden="true" />
                    <span className="truncate max-w-full">
                      {notesMode ? t.game.notesMode : t.game.normalMode}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={historyStack.length === 0 || paused || completed}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Undo2 className="w-4 h-4" aria-hidden="true" />
                    <span className="truncate max-w-full">{t.game.undo}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyDigit(0)}
                    disabled={selectedIdx === null || paused || completed}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Eraser className="w-4 h-4" aria-hidden="true" />
                    <span className="truncate max-w-full">{t.game.erase}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCheck}
                    disabled={paused || completed}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span className="truncate max-w-full">{t.game.check}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleHint}
                    disabled={paused || completed}
                    title={t.game.hintCostLabel}
                    className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 disabled:opacity-40 text-xs font-semibold text-[#B45309] transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Lightbulb className="w-4 h-4" aria-hidden="true" />
                    <span className="truncate max-w-full">{t.game.hintButton}</span>
                  </button>
                </div>

                {/* Visible Hint Cost Reminder */}
                <div className="flex items-center justify-between text-xs text-slate-500 px-1 tabular-nums">
                  <span>{t.game.keyboardTip}</span>
                  <span className="font-medium text-[#B45309] whitespace-nowrap shrink-0">
                    {t.game.hintButton}: {t.game.hintCostLabel}
                  </span>
                </div>

                {/* 1–9 Numeric Keypad */}
                <div className="grid grid-cols-9 gap-1.5" dir="ltr">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
                    const isAllPlaced = digitCounts[digit] >= 9;
                    return (
                      <button
                        key={digit}
                        type="button"
                        onClick={() => applyDigit(digit)}
                        disabled={paused || completed}
                        className={`h-11 sm:h-12 rounded-lg border font-display text-lg font-bold tabular-nums transition-colors cursor-pointer disabled:cursor-not-allowed ${
                          notesMode
                            ? 'border-amber-200 bg-amber-50/60 text-[#B45309] hover:bg-amber-100'
                            : isAllPlaced
                              ? 'border-slate-200 bg-slate-100 text-slate-400'
                              : 'border-[#E2E8F0] bg-white text-[#1E40AF] hover:bg-indigo-50 hover:border-indigo-300'
                        }`}
                      >
                        {digit}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Duel Panel + SudokuCueSvg */}
            <div className="lg:col-span-5 space-y-5">
              <DuelPanel
                seed={seed}
                difficulty={difficulty}
                lang={lang}
                elapsedSec={elapsedSec}
                hintsUsed={hintsUsed}
                score={liveScore}
                completed={completed}
                playerName={stored.playerName}
                challenge={challenge}
                t={t}
                onPlayerNameChange={handlePlayerNameChange}
                onStartRematch={handleStartRematch}
                onExitDuel={() => loadNewBoard(difficulty, createRandomSeed(), null)}
              />

              <SudokuCueSvg
                cells={cells}
                elapsedSec={elapsedSec}
                hintsUsed={hintsUsed}
                score={liveScore}
                difficulty={difficulty}
                challenge={challenge}
                completed={completed}
                t={t}
              />
            </div>
          </div>
        </section>

        {/* Stats, History & JSON Export/Import */}
        <StatsAndBackup
          stored={stored}
          t={t}
          onImportData={(imported) => {
            setStored(imported);
            saveStoredData(imported);
          }}
          onClearHistory={() => {
            setStored((prev) => {
              const next = { ...prev, history: [] };
              saveStoredData(next);
              return next;
            });
          }}
        />

        {/* Media.net Ad Slot 1 (between game/stats and SEO editorial guide) */}
        <AdSlot slotId="sudokucue-medianet-mid" placement="mid-leaderboard" />

        {/* Editorial SEO Guide, Interactive FAQ & Contextual Affiliate Gear */}
        <EditorialSeoSection t={t} />

        {/* Media.net Ad Slot 2 (bottom of page) */}
        <AdSlot slotId="sudokucue-medianet-bottom" placement="bottom-banner" />
      </main>

      {/* Clean Footer */}
      <footer className="no-print bg-white border-t border-[#E2E8F0] mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={CANONICAL_ORIGIN}
              className="font-semibold text-slate-800 hover:text-[#1E40AF]"
            >
              SudokuCue
            </a>
            <span aria-hidden="true">·</span>
            <span>{t.footer.canonicalNote}</span>
          </div>
          <div>{t.footer.privacyNote}</div>
        </div>
      </footer>
    </div>
  );
}
