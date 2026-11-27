import { Check, Copy, RefreshCw, Share2, Trophy, X } from 'lucide-react';
import { useState } from 'react';
import {
  buildChallengeShareUrl,
  buildWhatsAppShareUrl,
  evaluateDuelOutcome,
  type ChallengePayload,
} from '../engine/challenge';
import { createRandomSeed, formatTime, type Difficulty } from '../engine/sudoku';
import { formatMessage } from '../i18n';
import type { LangCode, TranslationBundle } from '../i18n/types';

interface DuelPanelProps {
  seed: number;
  difficulty: Difficulty;
  lang: LangCode;
  elapsedSec: number;
  hintsUsed: number;
  score: number;
  completed: boolean;
  playerName: string;
  challenge: ChallengePayload | null;
  t: TranslationBundle;
  onPlayerNameChange: (name: string) => void;
  onStartRematch: (newSeed: number, nextRound: number) => void;
  onExitDuel: () => void;
}

export function DuelPanel({
  seed,
  difficulty,
  lang,
  elapsedSec,
  hintsUsed,
  score,
  completed,
  playerName,
  challenge,
  t,
  onPlayerNameChange,
  onStartRematch,
  onExitDuel,
}: DuelPanelProps) {
  const [copiedMode, setCopiedMode] = useState<'main' | 'rematch' | null>(null);

  const currentRound = challenge?.r ?? 1;
  const diffLabel = t.game[difficulty];

  const sharePayload: ChallengePayload = {
    v: 1,
    s: seed,
    d: difficulty,
    l: lang,
    t: completed ? elapsedSec : null,
    h: hintsUsed,
    p: completed ? score : null,
    ...(playerName.trim() ? { n: playerName.trim().slice(0, 20) } : {}),
    r: currentRound,
  };

  const shareUrl = buildChallengeShareUrl(sharePayload, lang);

  const buildWhatsAppLink = (payload: ChallengePayload, kind: 'solved' | 'open' | 'rematch') => {
    const url = buildChallengeShareUrl(payload, lang);
    const msg =
      kind === 'solved'
        ? formatMessage(t.duel.whatsappMessageSolved, {
            diff: diffLabel,
            time: formatTime(payload.t ?? elapsedSec),
            hints: payload.h,
            score: payload.p ?? score,
            url,
          })
        : kind === 'rematch'
          ? formatMessage(t.duel.whatsappMessageRematch, {
              round: payload.r ?? currentRound + 1,
              diff: diffLabel,
              url,
            })
          : formatMessage(t.duel.whatsappMessageOpen, {
              diff: diffLabel,
              url,
            });
    return buildWhatsAppShareUrl(msg);
  };

  const handleCopy = async (urlToCopy: string, mode: 'main' | 'rematch') => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopiedMode(mode);
      window.setTimeout(() => setCopiedMode(null), 2000);
    } catch {
      // Fallback via temporary textarea if clipboard permission restricted
      const ta = document.createElement('textarea');
      ta.value = urlToCopy;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopiedMode(mode);
        window.setTimeout(() => setCopiedMode(null), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const outcome =
    completed && challenge
      ? evaluateDuelOutcome(elapsedSec, hintsUsed, score, challenge)
      : null;

  const deltaSeconds =
    challenge && challenge.t !== null ? elapsedSec - challenge.t : null;

  const handleRematchClick = () => {
    const nextSeed = createRandomSeed();
    const nextRound = currentRound + 1;
    const rematchPayload: ChallengePayload = {
      v: 1,
      s: nextSeed,
      d: difficulty,
      l: lang,
      t: null,
      h: 0,
      p: null,
      ...(playerName.trim() ? { n: playerName.trim().slice(0, 20) } : {}),
      r: nextRound,
    };
    const rematchUrl = buildChallengeShareUrl(rematchPayload, lang);
    void handleCopy(rematchUrl, 'rematch');
    onStartRematch(nextSeed, nextRound);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-4 no-print">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold text-slate-900 truncate">
            {challenge
              ? challenge.t !== null
                ? t.duel.activeDuelTitle
                : t.duel.openDuelTitle
              : t.duel.cardTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
            {t.game.boardSeed} #{seed} · {diffLabel} · {t.duel.roundLabel} {currentRound}
          </p>
        </div>

        {challenge && (
          <button
            type="button"
            onClick={onExitDuel}
            title={t.duel.playFreshSolo}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.duel.playFreshSolo}</span>
          </button>
        )}
      </div>

      {/* Incoming Challenger Benchmark */}
      {challenge && (
        <div className="rounded-lg bg-[#F8FAFC] border border-slate-200 p-3.5 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-700">
              {t.duel.challengerLabel}:{' '}
              <span className="text-slate-900">
                {challenge.n || t.duel.anonymousChallenger}
              </span>
            </span>
            <span className="font-mono-tabular text-[#D97706] font-semibold">
              {challenge.t !== null
                ? `${formatTime(challenge.t)} · ${challenge.p ?? 0} pts`
                : t.svg.openTarget}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed tabular-nums">
            {challenge.t !== null
              ? formatMessage(t.duel.beatTargetHint, {
                  time: formatTime(challenge.t),
                  hints: challenge.h,
                  score: challenge.p ?? 0,
                })
              : t.duel.liveCompareHint}
          </p>
        </div>
      )}

      {/* Completed Duel Head-to-Head Comparison */}
      {completed && challenge && outcome && (
        <div
          className={`rounded-lg border p-3.5 space-y-3 ${
            outcome === 'win'
              ? 'bg-emerald-50/70 border-emerald-200'
              : outcome === 'loss'
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Trophy
              className={`w-4 h-4 shrink-0 ${
                outcome === 'win'
                  ? 'text-[#059669]'
                  : outcome === 'loss'
                    ? 'text-[#D97706]'
                    : 'text-[#1E40AF]'
              }`}
              aria-hidden="true"
            />
            <span className="font-display text-sm font-bold text-slate-900">
              {outcome === 'win'
                ? t.duel.outcomeWin
                : outcome === 'tie'
                  ? t.duel.outcomeTie
                  : outcome === 'loss'
                    ? t.duel.outcomeLoss
                    : t.duel.outcomePending}
            </span>
          </div>

          {challenge.t !== null && deltaSeconds !== null && (
            <>
              <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-200/80 pt-2.5 tabular-nums">
                <div>
                  <div className="text-slate-500">{t.svg.you}</div>
                  <div className="font-mono-tabular font-bold text-slate-900 mt-0.5">
                    {formatTime(elapsedSec)}
                  </div>
                  <div className="text-slate-600">
                    {hintsUsed} {t.game.hints} · {score} pts
                  </div>
                </div>

                <div className="text-center flex flex-col justify-center">
                  <span
                    className={`font-semibold ${
                      deltaSeconds < 0
                        ? 'text-[#059669]'
                        : deltaSeconds > 0
                          ? 'text-[#D97706]'
                          : 'text-slate-700'
                    }`}
                  >
                    {deltaSeconds < 0
                      ? formatMessage(t.duel.timeDeltaFaster, { sec: Math.abs(deltaSeconds) })
                      : deltaSeconds > 0
                        ? formatMessage(t.duel.timeDeltaSlower, { sec: deltaSeconds })
                        : t.duel.timeDeltaEqual}
                  </span>
                </div>

                <div className="text-end">
                  <div className="text-slate-500">
                    {challenge.n || t.duel.anonymousChallenger}
                  </div>
                  <div className="font-mono-tabular font-bold text-slate-900 mt-0.5">
                    {formatTime(challenge.t)}
                  </div>
                  <div className="text-slate-600">
                    {challenge.h} {t.game.hints} · {challenge.p ?? 0} pts
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rematch & Share Result Back */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleRematchClick}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E40AF] hover:bg-indigo-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {copiedMode === 'rematch' ? t.duel.copied : t.duel.sendRematch}
              </span>
            </button>

            <a
              href={buildWhatsAppLink(sharePayload, 'solved')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#059669] hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.duel.shareVictoryBack}</span>
            </a>
          </div>
        </div>
      )}

      {/* Optional Player Nickname */}
      <div>
        <label htmlFor="player-nickname" className="block text-xs font-medium text-slate-600 mb-1">
          {t.duel.nicknameLabel}
        </label>
        <input
          id="player-nickname"
          type="text"
          maxLength={20}
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          placeholder={t.duel.nicknamePlaceholder}
          className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:bg-white"
        />
      </div>

      {/* Primary Challenge Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <a
          href={buildWhatsAppLink(sharePayload, completed ? 'solved' : 'open')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#059669] hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{t.duel.challengeWhatsApp}</span>
        </a>

        <button
          type="button"
          onClick={() => void handleCopy(shareUrl, 'main')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1E40AF] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {copiedMode === 'main' ? (
            <Check className="w-4 h-4 shrink-0 text-[#059669]" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span className="truncate">
            {copiedMode === 'main' ? t.duel.copied : t.duel.copyLink}
          </span>
        </button>
      </div>
    </div>
  );
}
