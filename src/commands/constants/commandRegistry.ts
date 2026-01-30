import { parseHelp } from "../commandChoices/help/helpers/parseHelp.js";
import { parseBeg } from "../commandChoices/beg/helpers/parseBeg.js";
import { parseProfile } from "../commandChoices/profile/helpers/parseProfile.js";
import { parseLeaderboard } from "../commandChoices/leaderboard/helpers/parseLeaderboard.js";

import { executeHelp } from "../commandChoices/help/help.js";
import { executeBeg } from "../commandChoices/beg/beg.js";
import { executeProfile } from "../commandChoices/profile/profile.js";
import { executeLeaderboard } from "../commandChoices/leaderboard/leaderboard.js";

import type { CommandMap } from "../types/CommandMap.js";

import { CHANNELS } from "../../config/channels.js";

export const COMMANDS: CommandMap = {
  help: {
    parse: parseHelp,
    execute: executeHelp,
    usage: '+help or +h | +help <command_name>',
    description: 'Get help for all commands or info on specific ones',
    isPersistent: false,
    category: 'General',
    allowedChannelIds: Object.values(CHANNELS)
  },

  beg: {
    parse: parseBeg,
    execute: executeBeg,
    usage: '+beg or +b',
    description: 'Beg to gain Baleh Bucks',
    isPersistent: false,
    category: 'Economy',
    allowedChannelIds: Object.values(CHANNELS)
  },

  profile: {
    parse: parseProfile,
    execute: executeProfile,
    usage: '+profile or +p',
    description: 'Check your profile statistics',
    isPersistent: false,
    category: 'General',
    allowedChannelIds: Object.values(CHANNELS)
  },

  leaderboard: {
    parse: parseLeaderboard,
    execute: executeLeaderboard,
    usage: '+leaderboard or +lb',
    description: 'Check the leaderboards to see whose the top 10 richest in the server',
    isPersistent: false,
    category: 'Economy',
    allowedChannelIds: Object.values(CHANNELS)
  },
} as const;

export type CommandName = keyof typeof COMMANDS;
