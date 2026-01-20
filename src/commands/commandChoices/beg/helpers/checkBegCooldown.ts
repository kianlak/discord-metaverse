import { BEG_COOLDOWN_MS } from "../constants/BEG_COOLDOWN_MS.js";

export function checkBegCooldown(lastBegAt: number, now: number): number {
  const elapsedMs = now - lastBegAt;
  const timeRemainingMs = BEG_COOLDOWN_MS - elapsedMs;

  if (timeRemainingMs <= 0) return 0;

  return timeRemainingMs;
}