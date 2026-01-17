import { executeBeg } from "./beg/beg.js";
import { parseBeg } from "./beg/helpers/parseBeg.js";

import type { BegCommand } from "./beg/types/beg.types.js";
import type { CommandDefinition } from "./interfaces/CommandDefinition.js";

export const COMMANDS = {
  beg: {
    parse: parseBeg,
    execute: executeBeg,
    usage: '+beg',
    description: 'Beg to gain Baleh Bucks',
  } satisfies CommandDefinition<BegCommand>,
} as const;

export type CommandName = keyof typeof COMMANDS;
