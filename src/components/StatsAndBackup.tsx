import { Download, Trash2, Upload } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { exportBackupJson, importBackupJson, type StoredData } from '../engine/storage';
import { formatTime, type Difficulty } from '../engine/sudoku';
import type { TranslationBundle } from '../i18n/types';

interface StatsAndBackupProps {
  stored: StoredData;
  t: TranslationBundle;
  onImportData: (data: StoredData) => void;
  onClearHistory: () => void;
}

export function StatsAndBackup({
  stored,
  t,
  onImportData,
  onClearHistory,
}: StatsAndBackupProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<'ok' | 'err' | null>(null);

  const handleExport = () => {
    const json = exportBackupJson(stored);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sudokucue-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = importBackupJson(text);
      if (imported) {
        onImportData(imported);
        setImportStatus('ok');
      } else {
        setImportStatus('err');
      }
    } catch {
      setImportStatus('err');
    } finally {
      e.target.value = '';
      window.setTimeout(() => setImportStatus(null), 3500);
    }
  };

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <section
      id="stats"
      className="no-print w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-slate-200"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
          {t.stats.sectionTitle}
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.stats.exportJson}</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E40AF] bg-white hover:bg-indigo-50 border border-[#E2E8F0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.stats.importJson}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={(e) => void handleFileChange(e)}
            className="hidden"
          />
        </div>
      </div>

      {importStatus && (
        <div
          role="status"
          className={`mb-5 px-4 py-2.5 rounded-lg border text-sm font-medium ${
            importStatus === 'ok'
              ? 'bg-emerald-50 border-emerald-200 text-[#059669]'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {importStatus === 'ok' ? t.stats.importSuccess : t.stats.importError}
        </div>
      )}

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-xs font-medium text-slate-500">{t.stats.streak}</div>
          <div className="font-mono-tabular text-2xl font-bold text-[#1E40AF] mt-1">
            {stored.streak}
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-xs font-medium text-slate-500">{t.stats.totalSolved}</div>
          <div className="font-mono-tabular text-2xl font-bold text-slate-900 mt-1">
            {stored.totalSolved}
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <div className="text-xs font-medium text-slate-500">{t.stats.duelsWon}</div>
          <div className="font-mono-tabular text-2xl font-bold text-[#059669] mt-1">
            {stored.duelsWon}
          </div>
        </div>

        {difficulties.map((diff) => {
          const rec = stored.best[diff];
          return (
            <div key={diff} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <div className="text-xs font-medium text-slate-500">
                {t.game[diff]} · {t.stats.bestTime}
              </div>
              <div className="font-mono-tabular text-xl font-bold text-slate-900 mt-1">
                {rec ? formatTime(rec.bestTimeSec) : t.stats.noRecord}
              </div>
              <div className="text-xs text-slate-500 tabular-nums mt-0.5">
                {rec ? `${rec.bestScore} pts` : t.stats.noRecord}
              </div>
            </div>
          );
        })}
      </div>

      {/* History Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <h3 className="font-display text-sm font-bold text-slate-900">{t.stats.historyTitle}</h3>
          {stored.history.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.stats.clearHistory}</span>
            </button>
          )}
        </div>

        {stored.history.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate-500">{t.stats.historyEmpty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-xs font-semibold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">{t.stats.dateCol}</th>
                  <th className="px-4 py-2.5">{t.stats.diffCol}</th>
                  <th className="px-4 py-2.5">{t.stats.timeCol}</th>
                  <th className="px-4 py-2.5">{t.stats.hintsCol}</th>
                  <th className="px-4 py-2.5">{t.stats.scoreCol}</th>
                  <th className="px-4 py-2.5">{t.stats.resultCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {stored.history.slice(0, 15).map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">
                      {entry.dateIso.slice(0, 10)}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-900 whitespace-nowrap">
                      {t.game[entry.difficulty]} · #{entry.seed}
                    </td>
                    <td className="px-4 py-2.5 font-mono-tabular text-slate-900 whitespace-nowrap">
                      {formatTime(entry.timeSec)}
                    </td>
                    <td className="px-4 py-2.5 font-mono-tabular text-slate-700 whitespace-nowrap">
                      {entry.hintsUsed}
                    </td>
                    <td className="px-4 py-2.5 font-mono-tabular font-semibold text-[#1E40AF] whitespace-nowrap">
                      {entry.score}
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      {entry.duelOutcome === 'win' ? (
                        <span className="font-semibold text-[#059669]">
                          Win {entry.opponentName ? `vs ${entry.opponentName}` : ''}
                        </span>
                      ) : entry.duelOutcome === 'loss' ? (
                        <span className="font-semibold text-[#D97706]">
                          Loss {entry.opponentName ? `vs ${entry.opponentName}` : ''}
                        </span>
                      ) : entry.duelOutcome === 'tie' ? (
                        <span className="font-semibold text-slate-700">Tie</span>
                      ) : (
                        <span className="text-slate-400">Solo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
