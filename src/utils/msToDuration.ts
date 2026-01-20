import type { DURATIONS } from "../types/DURATIONS.js";

export function msToDuration(ms: number, duration: DURATIONS) {
  switch(duration) {
    case 'SECONDS':
      return Math.ceil(ms / 1000);
    case 'MINUTES':
      return Math.ceil(ms / (60 * 1000));
  }
}