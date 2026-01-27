import type { CommandName } from './commandRegistry.js';

export const COMMAND_ALIASES: Record<string, CommandName> = {
  help: 'help',
  h: 'help',
  
  beg: 'beg',
  b: 'beg',

  leaderboard: 'leaderboard',
  lb: 'leaderboard',
};
