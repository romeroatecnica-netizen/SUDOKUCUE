import { formatTime, type CellState, type Difficulty } from '../engine/sudoku';
import type { ChallengePayload } from '../engine/challenge';
import type { TranslationBundle } from '../i18n/types';

interface SudokuCueSvgProps {
  cells: CellState[];
  elapsedSec: number;
  hintsUsed: number;
  score: number;
  difficulty: Difficulty;
  challenge: ChallengePayload | null;
  completed: boolean;
  t: TranslationBundle;
}

const PAR_SECONDS: Record<Difficulty, number> = {
  easy: 180,
  medium: 360,
  hard: 600,
};

export function SudokuCueSvg({
  cells,
  elapsedSec,
  hintsUsed,
  score,
  difficulty,
  challenge,
  completed,
  t,
}: SudokuCueSvgProps) {
  // Compute 3x3 block completion counts
  const blockStats = Array.from({ length: 9 }, (_, b) => {
    const br = Math.floor(b / 3);
    const bc = b % 3;
    let filled = 0;
    let hinted = 0;
    for (let dr = 0; dr < 3; dr++) {
      for (let dc = 0; dc < 3; dc++) {
        const idx = (br * 3 + dr) * 9 + (bc * 3 + dc);
        const cell = cells[idx];
        if (cell && cell.value !== 0) filled++;
        if (cell && cell.hinted) hinted++;
      }
    }
    return { filled, hinted };
  });

  const totalFilled = cells.reduce((acc, c) => acc + (c.value !== 0 ? 1 : 0), 0);
  const targetTime = challenge && challenge.t !== null ? challenge.t : PAR_SECONDS[difficulty];
  const maxBarSec = Math.max(targetTime, elapsedSec, 60);
  const playerWidth = Math.min(180, Math.max(8, Math.round((elapsedSec / maxBarSec) * 180)));
  const targetWidth = Math.min(180, Math.max(8, Math.round((targetTime / maxBarSec) * 180)));

  const playerAhead = challenge && challenge.t !== null ? elapsedSec <= challenge.t : completed;
  const playerColor = completed && playerAhead ? '#059669' : '#1E40AF';

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 print:border-slate-300">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-display text-sm font-bold text-slate-900">{t.svg.title}</h3>
        <span className="text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
          {totalFilled}/81 · {Math.round((totalFilled / 81) * 100)}%
        </span>
      </div>

      <div dir="ltr">
        <svg
          viewBox="0 0 420 156"
          role="img"
          aria-label={t.svg.title}
          className="w-full h-auto block"
        >
        <rect x="0" y="0" width="420" height="156" rx="8" fill="#F8FAFC" />

        {/* Left Zone: 3x3 Quadrant Map */}
        <text
          x="16"
          y="22"
          fontSize="11"
          fontWeight="600"
          fill="#475569"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {t.svg.quadrantMap}
        </text>

        <g transform="translate(16, 32)">
          {blockStats.map((blk, i) => {
            const r = Math.floor(i / 3);
            const c = i % 3;
            const x = c * 36;
            const y = r * 36;
            const isFull = blk.filled === 9;
            const fillColor = isFull
              ? '#059669'
              : blk.filled >= 6
                ? '#1E40AF'
                : blk.filled > 0
                  ? '#CBD5E1'
                  : '#E2E8F0';
            const textColor = isFull || blk.filled >= 6 ? '#FFFFFF' : '#334155';

            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <rect
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                  rx="4"
                  fill={fillColor}
                  stroke={blk.hinted > 0 ? '#D97706' : '#FFFFFF'}
                  strokeWidth={blk.hinted > 0 ? '1.5' : '1'}
                />
                <text
                  x="16"
                  y="20"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={textColor}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {blk.filled}/9
                </text>
              </g>
            );
          })}
        </g>

        {/* Divider */}
        <line x1="142" y1="16" x2="142" y2="140" stroke="#E2E8F0" strokeWidth="1" />

        {/* Right Zone: Duel Time & Score Benchmark */}
        <text
          x="158"
          y="22"
          fontSize="11"
          fontWeight="600"
          fill="#475569"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {t.svg.duelBenchmark}
        </text>

        {/* Player Row */}
        <text
          x="158"
          y="48"
          fontSize="11"
          fontWeight="700"
          fill="#0F172A"
          fontFamily="Inter, sans-serif"
        >
          {t.svg.you}
        </text>
        <text
          x="404"
          y="48"
          textAnchor="end"
          fontSize="11"
          fontWeight="700"
          fill={playerColor}
          fontFamily="JetBrains Mono, monospace"
        >
          {formatTime(elapsedSec)} · {score} pts
        </text>
        <rect x="158" y="56" width="246" height="12" rx="4" fill="#E2E8F0" />
        <rect x="158" y="56" width={playerWidth} height="12" rx="4" fill={playerColor} />

        {/* Challenger / Target Row */}
        <text
          x="158"
          y="94"
          fontSize="11"
          fontWeight="600"
          fill="#475569"
          fontFamily="Inter, sans-serif"
        >
          {challenge
            ? challenge.n || t.duel.anonymousChallenger
            : `${t.svg.target} (${t.game[difficulty]})`}
        </text>
        <text
          x="404"
          y="94"
          textAnchor="end"
          fontSize="11"
          fontWeight="600"
          fill="#B45309"
          fontFamily="JetBrains Mono, monospace"
        >
          {challenge && challenge.t !== null
            ? `${formatTime(challenge.t)} · ${challenge.p ?? 0} pts`
            : challenge
              ? t.svg.openTarget
              : `${formatTime(PAR_SECONDS[difficulty])}`}
        </text>
        <rect x="158" y="102" width="246" height="12" rx="4" fill="#E2E8F0" />
        <rect
          x="158"
          y="102"
          width={challenge && challenge.t === null ? 90 : targetWidth}
          height="12"
          rx="4"
          fill="#D97706"
          fillOpacity={challenge && challenge.t === null ? '0.45' : '1'}
        />

        {/* Bottom Legend Line */}
        <text
          x="158"
          y="138"
          fontSize="10"
          fill="#64748B"
          fontFamily="JetBrains Mono, monospace"
        >
          {t.svg.remaining}: {81 - totalFilled} · {t.game.hints}: {hintsUsed}
        </text>
      </svg>
      </div>
    </div>
  );
}
