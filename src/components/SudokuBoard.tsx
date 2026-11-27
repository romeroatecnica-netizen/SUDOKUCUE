import type { CellState } from '../engine/sudoku';

interface SudokuBoardProps {
  cells: CellState[];
  selectedIdx: number | null;
  conflicts: Set<number>;
  wrongIndices: Set<number>;
  paused: boolean;
  completed: boolean;
  pausedLabel: string;
  onSelectCell: (idx: number) => void;
  onResume: () => void;
}

export function SudokuBoard({
  cells,
  selectedIdx,
  conflicts,
  wrongIndices,
  paused,
  completed,
  pausedLabel,
  onSelectCell,
  onResume,
}: SudokuBoardProps) {
  const selectedCell = selectedIdx !== null ? cells[selectedIdx] : null;
  const selectedValue = selectedCell?.value ?? 0;
  const selectedBoxRow = selectedCell ? Math.floor(selectedCell.row / 3) : -1;
  const selectedBoxCol = selectedCell ? Math.floor(selectedCell.col / 3) : -1;

  return (
    <div className="relative w-full max-w-[468px] mx-auto select-none print-board-wrapper" dir="ltr">
      <div
        role="grid"
        aria-label="9x9 Sudoku Board"
        className="grid grid-cols-9 w-full aspect-square bg-white border-2 border-slate-900 rounded-md overflow-hidden shadow-xs"
      >
        {cells.map((cell, idx) => {
          const isGiven = cell.given !== 0;
          const isSelected = idx === selectedIdx;
          const isConflict = conflicts.has(idx);
          const isWrong = wrongIndices.has(idx);

          const cellBoxRow = Math.floor(cell.row / 3);
          const cellBoxCol = Math.floor(cell.col / 3);
          const isPeer =
            selectedCell !== null &&
            !isSelected &&
            (cell.row === selectedCell.row ||
              cell.col === selectedCell.col ||
              (cellBoxRow === selectedBoxRow && cellBoxCol === selectedBoxCol));

          const isMatchingDigit =
            selectedValue !== 0 && cell.value === selectedValue && !isSelected;

          // Thick 3x3 borders
          const borderRight =
            cell.col === 8
              ? ''
              : cell.col === 2 || cell.col === 5
                ? 'border-r-2 border-r-slate-800'
                : 'border-r border-r-slate-200';
          const borderBottom =
            cell.row === 8
              ? ''
              : cell.row === 2 || cell.row === 5
                ? 'border-b-2 border-b-slate-800'
                : 'border-b border-b-slate-200';

          let bgClass = isGiven ? 'bg-slate-50/90' : 'bg-white';
          if (isPeer) bgClass = 'bg-slate-100';
          if (isMatchingDigit) bgClass = 'bg-indigo-100/75';
          if (isConflict || isWrong) bgClass = 'bg-rose-50';
          if (completed) bgClass = isGiven ? 'bg-emerald-50/35' : 'bg-emerald-50/70';
          if (isSelected && !completed) {
            bgClass = isConflict || isWrong ? 'bg-rose-100' : 'bg-indigo-100';
          }

          let textClass = 'text-[#1E40AF] font-semibold';
          if (isGiven) textClass = 'text-slate-900 font-bold';
          if (cell.hinted) textClass = 'text-[#D97706] font-semibold';
          if (completed && !isGiven && !cell.hinted) textClass = 'text-[#059669] font-bold';
          if (isConflict || isWrong) textClass = 'text-rose-700 font-bold';

          return (
            <button
              key={idx}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-label={`Row ${cell.row + 1} Column ${cell.col + 1}${
                cell.value ? `, value ${cell.value}` : ', empty'
              }${isConflict ? ', conflict' : ''}`}
              onClick={() => onSelectCell(idx)}
              className={`relative flex items-center justify-center aspect-square p-0.5 transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E40AF] ${borderRight} ${borderBottom} ${bgClass} ${
                isSelected ? 'ring-2 ring-inset ring-[#1E40AF] z-10' : ''
              }`}
            >
              {/* Non-hue-only conflict or hint marker */}
              {(isConflict || isWrong) && !paused && (
                <span
                  aria-hidden="true"
                  className="absolute top-0.5 right-0.5 text-[9px] leading-none font-bold text-rose-700 no-print"
                >
                  !
                </span>
              )}
              {cell.hinted && !isConflict && !isWrong && !paused && (
                <span
                  aria-hidden="true"
                  className="absolute top-0.5 right-1 text-[9px] leading-none font-bold text-[#D97706] no-print"
                >
                  *
                </span>
              )}

              {!paused && cell.value !== 0 ? (
                <span
                  className={`font-display text-lg sm:text-2xl leading-none tabular-nums ${textClass}`}
                >
                  {cell.value}
                </span>
              ) : !paused && cell.notes.length > 0 ? (
                <span className="grid grid-cols-3 grid-rows-3 w-full h-full place-items-center text-[9px] sm:text-[10px] leading-none font-medium text-slate-500 tabular-nums no-print">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
                    const has = cell.notes.includes(n);
                    const highlightNote = has && selectedValue === n;
                    return (
                      <span
                        key={n}
                        className={
                          highlightNote
                            ? 'text-[#1E40AF] font-bold'
                            : has
                              ? 'text-slate-600'
                              : 'opacity-0'
                        }
                      >
                        {n}
                      </span>
                    );
                  })}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Paused Cover (hidden on print) */}
      {paused && !completed && (
        <div className="no-print absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-md bg-white/95 backdrop-blur-xs border-2 border-slate-900 p-6 text-center">
          <p className="text-sm font-medium text-slate-700 max-w-xs">{pausedLabel}</p>
          <button
            type="button"
            onClick={onResume}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1E40AF] hover:bg-indigo-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Resume
          </button>
        </div>
      )}
    </div>
  );
}
