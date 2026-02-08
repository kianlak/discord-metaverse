import type { CommandName } from './commandRegistry.js';

export const COMMAND_ALIASES: Record<string, CommandName> = {
  help: 'help',
  h: 'help',

  profile: 'profile',
  p: 'profile',
  
  beg: 'beg',
  b: 'beg',

  leaderboard: 'leaderboard',
  lb: 'leaderboard',

  inventory: 'inventory',
  i: 'inventory',

  use: 'use',
  u: 'use',
  
  shop: 'shop',
  s: 'shop',
};
