import type { LangCode } from '../i18n/types';
import type { Difficulty } from './sudoku';

export interface ChallengePayload {
  v: 1;
  s: number; // deterministic puzzle seed
  d: Difficulty;
  l: LangCode;
  t: number | null; // challenger time in seconds (null if open live challenge)
  h: number; // challenger hints used
  p: number | null; // challenger score in points (null if open live challenge)
  n?: string; // optional challenger nickname
  r?: number; // round / rematch number
}

const VALID_DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
const VALID_LANGS: LangCode[] = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'ru', 'zh', 'ja'];

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64: string): string | null {
  try {
    const padded = b64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64.length + 3) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function encodeChallengeHash(payload: ChallengePayload): string {
  const clean: ChallengePayload = {
    v: 1,
    s: Math.floor(Math.abs(payload.s)) >>> 0,
    d: payload.d,
    l: payload.l,
    t: payload.t !== null ? Math.max(0, Math.round(payload.t)) : null,
    h: Math.max(0, Math.round(payload.h)),
    p: payload.p !== null ? Math.max(0, Math.round(payload.p)) : null,
    ...(payload.n && payload.n.trim() ? { n: payload.n.trim().slice(0, 20) } : {}),
    r: payload.r && payload.r > 1 ? Math.round(payload.r) : 1,
  };
  return `#c=${toBase64Url(JSON.stringify(clean))}`;
}

export function decodeChallengeHash(hash: string): ChallengePayload | null {
  if (!hash) return null;
  const match = hash.match(/c=([A-Za-z0-9\-_]+)/);
  if (!match) return null;

  const decoded = fromBase64Url(match[1]);
  if (!decoded) return null;

  try {
    const raw = JSON.parse(decoded) as Partial<ChallengePayload>;
    if (raw.v !== 1) return null;
    if (typeof raw.s !== 'number' || !Number.isFinite(raw.s) || raw.s <= 0) return null;
    if (!raw.d || !VALID_DIFFICULTIES.includes(raw.d)) return null;

    const lang: LangCode = raw.l && VALID_LANGS.includes(raw.l) ? raw.l : 'en';
    const time =
      raw.t === null || raw.t === undefined
        ? null
        : typeof raw.t === 'number' && Number.isFinite(raw.t) && raw.t >= 0
          ? Math.round(raw.t)
          : null;
    const hints = typeof raw.h === 'number' && Number.isFinite(raw.h) && raw.h >= 0 ? Math.round(raw.h) : 0;
    const points =
      raw.p === null || raw.p === undefined
        ? null
        : typeof raw.p === 'number' && Number.isFinite(raw.p) && raw.p >= 0
          ? Math.round(raw.p)
          : null;

    return {
      v: 1,
      s: Math.floor(Math.abs(raw.s)) >>> 0,
      d: raw.d,
      l: lang,
      t: time,
      h: hints,
      p: points,
      ...(typeof raw.n === 'string' && raw.n.trim() ? { n: raw.n.trim().slice(0, 20) } : {}),
      r: typeof raw.r === 'number' && Number.isFinite(raw.r) && raw.r >= 1 ? Math.round(raw.r) : 1,
    };
  } catch {
    return null;
  }
}

export function buildChallengeShareUrl(payload: ChallengePayload, activeLang: LangCode): string {
  const baseOrigin =
    typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://sudokucue.bastelar.com/';
  const langQuery = activeLang === 'en' ? '' : `?lang=${activeLang}`;
  return `${baseOrigin}${langQuery}${encodeChallengeHash(payload)}`;
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export type DuelOutcome = 'win' | 'tie' | 'loss' | 'pending';

export function evaluateDuelOutcome(
  playerTime: number,
  playerHints: number,
  playerScore: number,
  challenger: ChallengePayload
): DuelOutcome {
  if (challenger.t === null || challenger.p === null) {
    return 'pending';
  }
  if (playerScore > challenger.p) return 'win';
  if (playerScore < challenger.p) return 'loss';
  if (playerTime < challenger.t) return 'win';
  if (playerTime > challenger.t) return 'loss';
  if (playerHints < challenger.h) return 'win';
  if (playerHints > challenger.h) return 'loss';
  return 'tie';
}
