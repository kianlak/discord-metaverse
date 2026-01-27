import type { CommandMap } from "../types/CommandMap.js";

import { COMMANDS } from "../constants/commandRegistry.js";

export function getCommand<K extends keyof CommandMap>(name: K): CommandMap[K] {
  return COMMANDS[name];
}