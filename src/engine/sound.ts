let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq: number, durationSec: number, type: OscillatorType = 'sine', gainVal = 0.04, delaySec = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime + delaySec;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(gainVal, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + durationSec);
}

export const soundFx = {
  tap(muted: boolean) {
    if (muted) return;
    playTone(520, 0.045, 'sine', 0.03);
  },
  note(muted: boolean) {
    if (muted) return;
    playTone(680, 0.035, 'triangle', 0.02);
  },
  conflict(muted: boolean) {
    if (muted) return;
    playTone(190, 0.12, 'sawtooth', 0.025);
  },
  hint(muted: boolean) {
    if (muted) return;
    playTone(440, 0.08, 'sine', 0.035);
    playTone(587.33, 0.11, 'sine', 0.035, 0.06);
  },
  victory(muted: boolean) {
    if (muted) return;
    playTone(523.25, 0.14, 'triangle', 0.045, 0);
    playTone(659.25, 0.14, 'triangle', 0.045, 0.09);
    playTone(783.99, 0.18, 'triangle', 0.05, 0.18);
    playTone(1046.5, 0.28, 'triangle', 0.055, 0.27);
  },
};
