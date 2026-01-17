import type { LogType } from "../types/LogType.js";
import type { LogTypeData } from "../types/LogTypeData.js";

export const LOG_STYLES: Readonly<Record<LogType, LogTypeData>> = {
  SUCCESS: { color: '\x1b[32m', emoji: '✅' },
  INFO:    { color: '\x1b[36m', emoji: 'ℹ️' },
  WARN:    { color: '\x1b[33m', emoji: '⚠️' },
  ERROR:   { color: '\x1b[31m', emoji: '❌' },
} as const;

export const ANSI_RESET = '\x1b[0m';