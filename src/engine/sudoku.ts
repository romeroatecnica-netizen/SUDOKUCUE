export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CellState {
  row: number;
  col: number;
  given: number;
  value: number;
  notes: number[];
  hinted: boolean;
}

export interface GeneratedPuzzle {
  seed: number;
  difficulty: Difficulty;
  givens: number[];
  solution: number[];
}

export const HINT_COST_POINTS = 150;
export const HINT_COST_SECONDS = 30;
export const CHECK_MISTAKE_PENALTY = 40;

export const DIFFICULTY_BASE_SCORE: Record<Difficulty, number> = {
  easy: 1000,
  medium: 1800,
  hard: 2800,
};

const TARGET_GIVENS: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 25,
};

export function normalizeSeed(seed: number): number {
  const n = Math.floor(Math.abs(seed)) >>> 0;
  return n === 0 ? 1337421 : n;
}

export function createRandomSeed(): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return normalizeSeed(arr[0]);
  }
  return normalizeSeed(Math.floor(Math.random() * 0x7fffffff) + 1);
}

export function getDailySeed(difficulty: Difficulty): number {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth() + 1;
  const d = now.getUTCDate();
  const diffOffset = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 29 : 47;
  const raw = y * 10000 + m * 100 + d + diffOffset * 1000000;
  return normalizeSeed(raw ^ 0x5bd1e995);
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithRng<T>(items: T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createSolvedBoard(rng: () => number): number[] {
  const board = new Array<number>(81).fill(0);
  const rowMask = new Int32Array(9);
  const colMask = new Int32Array(9);
  const boxMask = new Int32Array(9);

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function fill(idx: number): boolean {
    if (idx === 81) return true;
    const r = (idx / 9) | 0;
    const c = idx % 9;
    const b = ((r / 3) | 0) * 3 + ((c / 3) | 0);
    const used = rowMask[r] | colMask[c] | boxMask[b];
    const order = shuffleWithRng(digits, rng);

    for (let i = 0; i < 9; i++) {
      const d = order[i];
      const bit = 1 << (d - 1);
      if ((used & bit) !== 0) continue;

      board[idx] = d;
      rowMask[r] |= bit;
      colMask[c] |= bit;
      boxMask[b] |= bit;

      if (fill(idx + 1)) return true;

      board[idx] = 0;
      rowMask[r] &= ~bit;
      colMask[c] &= ~bit;
      boxMask[b] &= ~bit;
    }
    return false;
  }

  fill(0);
  return board;
}

function countSolutions(board: number[], limit = 2): number {
  const work = [...board];
  const rowMask = new Int32Array(9);
  const colMask = new Int32Array(9);
  const boxMask = new Int32Array(9);

  for (let idx = 0; idx < 81; idx++) {
    const d = work[idx];
    if (d !== 0) {
      const r = (idx / 9) | 0;
      const c = idx % 9;
      const b = ((r / 3) | 0) * 3 + ((c / 3) | 0);
      const bit = 1 << (d - 1);
      if ((rowMask[r] & bit) || (colMask[c] & bit) || (boxMask[b] & bit)) {
        return 0;
      }
      rowMask[r] |= bit;
      colMask[c] |= bit;
      boxMask[b] |= bit;
    }
  }

  let solutions = 0;

  function search(): void {
    if (solutions >= limit) return;

    let bestIdx = -1;
    let bestCandidates = 0;
    let bestCount = 10;

    for (let idx = 0; idx < 81; idx++) {
      if (work[idx] !== 0) continue;
      const r = (idx / 9) | 0;
      const c = idx % 9;
      const b = ((r / 3) | 0) * 3 + ((c / 3) | 0);
      const avail = ~(rowMask[r] | colMask[c] | boxMask[b]) & 0x1ff;
      if (avail === 0) return;

      // Count set bits (Kernighan)
      let cnt = 0;
      let tmp = avail;
      while (tmp) {
        tmp &= tmp - 1;
        cnt++;
      }
      if (cnt < bestCount) {
        bestCount = cnt;
        bestIdx = idx;
        bestCandidates = avail;
        if (cnt === 1) break;
      }
    }

    if (bestIdx === -1) {
      solutions++;
      return;
    }

    const r = (bestIdx / 9) | 0;
    const c = bestIdx % 9;
    const b = ((r / 3) | 0) * 3 + ((c / 3) | 0);

    for (let d = 1; d <= 9; d++) {
      const bit = 1 << (d - 1);
      if ((bestCandidates & bit) === 0) continue;

      work[bestIdx] = d;
      rowMask[r] |= bit;
      colMask[c] |= bit;
      boxMask[b] |= bit;

      search();

      work[bestIdx] = 0;
      rowMask[r] &= ~bit;
      colMask[c] &= ~bit;
      boxMask[b] &= ~bit;

      if (solutions >= limit) return;
    }
  }

  search();
  return solutions;
}

export function generatePuzzle(difficulty: Difficulty, rawSeed: number): GeneratedPuzzle {
  const seed = normalizeSeed(rawSeed);
  const diffSalt = difficulty === 'easy' ? 0x1111 : difficulty === 'medium' ? 0x2222 : 0x3333;
  const rng = mulberry32(seed ^ diffSalt);

  const solution = createSolvedBoard(rng);
  const givens = [...solution];
  const target = TARGET_GIVENS[difficulty];

  const indices = shuffleWithRng(
    Array.from({ length: 81 }, (_, i) => i),
    rng
  );

  let remainingGivens = 81;
  for (let i = 0; i < indices.length && remainingGivens > target; i++) {
    const idx = indices[i];
    const backup = givens[idx];
    givens[idx] = 0;

    if (countSolutions(givens, 2) === 1) {
      remainingGivens--;
    } else {
      givens[idx] = backup;
    }
  }

  return {
    seed,
    difficulty,
    givens,
    solution,
  };
}

export function buildInitialCells(givens: number[]): CellState[] {
  return givens.map((g, idx) => ({
    row: (idx / 9) | 0,
    col: idx % 9,
    given: g,
    value: g,
    notes: [],
    hinted: false,
  }));
}

export function getConflicts(cells: CellState[]): Set<number> {
  const conflicts = new Set<number>();

  // Rows
  for (let r = 0; r < 9; r++) {
    const seen = new Map<number, number[]>();
    for (let c = 0; c < 9; c++) {
      const idx = r * 9 + c;
      const val = cells[idx]?.value ?? 0;
      if (val === 0) continue;
      const list = seen.get(val) ?? [];
      list.push(idx);
      seen.set(val, list);
    }
    seen.forEach((idxs) => {
      if (idxs.length > 1) idxs.forEach((i) => conflicts.add(i));
    });
  }

  // Columns
  for (let c = 0; c < 9; c++) {
    const seen = new Map<number, number[]>();
    for (let r = 0; r < 9; r++) {
      const idx = r * 9 + c;
      const val = cells[idx]?.value ?? 0;
      if (val === 0) continue;
      const list = seen.get(val) ?? [];
      list.push(idx);
      seen.set(val, list);
    }
    seen.forEach((idxs) => {
      if (idxs.length > 1) idxs.forEach((i) => conflicts.add(i));
    });
  }

  // 3x3 Boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen = new Map<number, number[]>();
      for (let dr = 0; dr < 3; dr++) {
        for (let dc = 0; dc < 3; dc++) {
          const idx = (br * 3 + dr) * 9 + (bc * 3 + dc);
          const val = cells[idx]?.value ?? 0;
          if (val === 0) continue;
          const list = seen.get(val) ?? [];
          list.push(idx);
          seen.set(val, list);
        }
      }
      seen.forEach((idxs) => {
        if (idxs.length > 1) idxs.forEach((i) => conflicts.add(i));
      });
    }
  }

  return conflicts;
}

export function isBoardSolved(cells: CellState[], solution: number[]): boolean {
  if (cells.length !== 81 || solution.length !== 81) return false;
  for (let i = 0; i < 81; i++) {
    if (cells[i].value !== solution[i]) return false;
  }
  return getConflicts(cells).size === 0;
}

export function cleanPeerNotes(cells: CellState[], index: number, digit: number): CellState[] {
  const row = (index / 9) | 0;
  const col = index % 9;
  const boxRow = (row / 3) | 0;
  const boxCol = (col / 3) | 0;

  return cells.map((cell, idx) => {
    if (idx === index || cell.notes.length === 0) return cell;
    const sameRow = cell.row === row;
    const sameCol = cell.col === col;
    const sameBox = ((cell.row / 3) | 0) === boxRow && ((cell.col / 3) | 0) === boxCol;
    if ((sameRow || sameCol || sameBox) && cell.notes.includes(digit)) {
      return { ...cell, notes: cell.notes.filter((n) => n !== digit) };
    }
    return cell;
  });
}

export function calculateScore(
  difficulty: Difficulty,
  elapsedSec: number,
  hintsUsed: number,
  checkMistakes = 0
): number {
  const base = DIFFICULTY_BASE_SCORE[difficulty];
  const raw = base - elapsedSec * 2 - hintsUsed * HINT_COST_POINTS - checkMistakes * CHECK_MISTAKE_PENALTY;
  return Math.max(100, Math.round(raw));
}

export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
