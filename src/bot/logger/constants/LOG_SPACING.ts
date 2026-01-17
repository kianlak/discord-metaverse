import type { LogType } from "../types/LogType.js";

export const LOG_SPACING: Readonly<Record<LogType, string>> = {
  SUCCESS: ' ',
  INFO: '    ',
  WARN: '    ',
  ERROR: '   ',
} as const;