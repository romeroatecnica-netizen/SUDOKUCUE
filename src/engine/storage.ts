import type { LangCode } from '../i18n/types';
import type { ChallengePayload, DuelOutcome } from './challenge';
import type { CellState, Difficulty } from './sudoku';

const STORAGE_KEY = 'sudokucue_storage_v1';

export interface BestRecord {
  bestTimeSec: number;
  bestScore: number;
  solvedCount: number;
}

export interface MatchHistoryEntry {
  id: string;
  dateIso: string;
  difficulty: Difficulty;
  seed: number;
  timeSec: number;
  hintsUsed: number;
  score: number;
  duelOutcome?: DuelOutcome;
  opponentName?: string;
  opponentTimeSec?: number | null;
  opponentScore?: number | null;
}

export interface ActiveGameSnapshot {
  seed: number;
  difficulty: Difficulty;
  cells: CellState[];
  elapsedSec: number;
  hintsUsed: number;
  checkMistakes: number;
  completed: boolean;
  finalScore: number | null;
  challenge: ChallengePayload | null;
}

export interface StoredData {
  version: 1;
  preferredLang?: LangCode;
  playerName: string;
  muted: boolean;
  streak: number;
  totalSolved: number;
  duelsWon: number;
  best: Record<Difficulty, BestRecord | null>;
  history: MatchHistoryEntry[];
  activeGame: ActiveGameSnapshot | null;
}

export function getDefaultStoredData(): StoredData {
  return {
    version: 1,
    playerName: '',
    muted: false,
    streak: 0,
    totalSolved: 0,
    duelsWon: 0,
    best: {
      easy: null,
      medium: null,
      hard: null,
    },
    history: [],
    activeGame: null,
  };
}

export function loadStoredData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStoredData();
    const parsed = JSON.parse(raw) as Partial<StoredData>;
    return validateAndNormalizeStoredData(parsed) ?? getDefaultStoredData();
  } catch {
    return getDefaultStoredData();
  }
}

export function saveStoredData(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota / private browsing errors gracefully
  }
}

export function validateAndNormalizeStoredData(input: unknown): StoredData | null {
  if (!input || typeof input !== 'object') return null;
  const obj = input as Partial<StoredData>;
  const defaults = getDefaultStoredData();

  const normalizeBest = (rec: unknown): BestRecord | null => {
    if (!rec || typeof rec !== 'object') return null;
    const r = rec as Partial<BestRecord>;
    if (
      typeof r.bestTimeSec === 'number' &&
      typeof r.bestScore === 'number' &&
      typeof r.solvedCount === 'number'
    ) {
      return {
        bestTimeSec: Math.max(0, Math.round(r.bestTimeSec)),
        bestScore: Math.max(0, Math.round(r.bestScore)),
        solvedCount: Math.max(0, Math.round(r.solvedCount)),
      };
    }
    return null;
  };

  const history: MatchHistoryEntry[] = Array.isArray(obj.history)
    ? obj.history
        .filter(
          (item): item is MatchHistoryEntry =>
            Boolean(item) &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.dateIso === 'string' &&
            (item.difficulty === 'easy' || item.difficulty === 'medium' || item.difficulty === 'hard') &&
            typeof item.seed === 'number' &&
            typeof item.timeSec === 'number' &&
            typeof item.score === 'number'
        )
        .slice(0, 50)
    : [];

  return {
    version: 1,
    preferredLang: obj.preferredLang,
    playerName: typeof obj.playerName === 'string' ? obj.playerName.slice(0, 20) : '',
    muted: Boolean(obj.muted),
    streak: typeof obj.streak === 'number' && obj.streak >= 0 ? Math.round(obj.streak) : defaults.streak,
    totalSolved:
      typeof obj.totalSolved === 'number' && obj.totalSolved >= 0
        ? Math.round(obj.totalSolved)
        : defaults.totalSolved,
    duelsWon:
      typeof obj.duelsWon === 'number' && obj.duelsWon >= 0 ? Math.round(obj.duelsWon) : defaults.duelsWon,
    best: {
      easy: normalizeBest(obj.best?.easy),
      medium: normalizeBest(obj.best?.medium),
      hard: normalizeBest(obj.best?.hard),
    },
    history,
    activeGame:
      obj.activeGame &&
      typeof obj.activeGame === 'object' &&
      Array.isArray(obj.activeGame.cells) &&
      obj.activeGame.cells.length === 81
        ? obj.activeGame
        : null,
  };
}

export function exportBackupJson(data: StoredData): string {
  return JSON.stringify(
    {
      ...data,
      exportedAt: new Date().toISOString(),
      app: 'SudokuCue',
    },
    null,
    2
  );
}

export function importBackupJson(rawText: string): StoredData | null {
  try {
    const parsed = JSON.parse(rawText);
    return validateAndNormalizeStoredData(parsed);
  } catch {
    return null;
  }
}
