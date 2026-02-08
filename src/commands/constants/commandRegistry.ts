import { parseHelp } from "../commandChoices/help/helpers/parseHelp.js";
import { parseBeg } from "../commandChoices/beg/helpers/parseBeg.js";
import { parseProfile } from "../commandChoices/profile/helpers/parseProfile.js";
import { parseLeaderboard } from "../commandChoices/leaderboard/helpers/parseLeaderboard.js";
import { parseInventory } from "../commandChoices/inventory/helpers/parseInventory.js";
import { parseUse } from "../commandChoices/use/helpers/parseUse.js";
import { parseShop } from "../commandChoices/shop/helpers/parseShop.js";

import { executeHelp } from "../commandChoices/help/help.js";
import { executeBeg } from "../commandChoices/beg/beg.js";
import { executeProfile } from "../commandChoices/profile/profile.js";
import { executeLeaderboard } from "../commandChoices/leaderboard/leaderboard.js";
import { executeInventory } from "../commandChoices/inventory/inventory.js";
import { executeUse } from "../commandChoices/use/use.js";
import { executeShop } from "../commandChoices/shop/shop.js";

import type { CommandMap } from "../types/CommandMap.js";

import { CHANNELS } from "../../config/channels.js";

export const COMMANDS: CommandMap = {
  help: {
    parse: parseHelp,
    execute: executeHelp,
    usage: '+help or +h → +help <command_name>',
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
    usage: '+profile or +p → +profile <discord_id>',
    description: 'Check your profile statistics or another users',
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

  inventory: {
    parse: parseInventory,
    execute: executeInventory,
    usage: '+inventory or +in → +inventory <discord_id> | +inventory <item_id>',
    description: 'Check user inventory or information about an item',
    isPersistent: false,
    category: 'General',
    allowedChannelIds: Object.values(CHANNELS)
  },

  use: {
    parse: parseUse,
    execute: executeUse,
    usage: '+use or +u → +use <item_id>',
    description: 'Use items from your inventory',
    isPersistent: false,
    category: 'General',
    allowedChannelIds: Object.values(CHANNELS)
  },

  shop: {
    parse: parseShop,
    execute: executeShop,
    usage: '+shop or +s',
    description: 'Buy or sell items at the shop',
    isPersistent: true,
    category: 'Economy',
    allowedChannelIds: [CHANNELS.BOLBI_SHOP, CHANNELS.DEV_TEST]
  },
} as const;

export type CommandName = keyof typeof COMMANDS;
