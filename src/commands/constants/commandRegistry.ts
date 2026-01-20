import { CHANNELS } from "../../config/channels.js";
import { executeBeg } from "../commandChoices/beg/beg.js";
import { parseBeg } from "../commandChoices/beg/helpers/parseBeg.js";

import type { BegCommand } from "../commandChoices/beg/types/BegCommand.js";
import type { CommandDefinition } from "../interfaces/CommandDefinition.js";

export const COMMANDS = {
  beg: {
    parse: parseBeg,
    execute: executeBeg,
    usage: '+beg or +b',
    description: 'Beg to gain Baleh Bucks',
    isPersistent: false,
    allowedChannelIds: Object.values(CHANNELS)
  } satisfies CommandDefinition<BegCommand>,
} as const;

export type CommandName = keyof typeof COMMANDS;
