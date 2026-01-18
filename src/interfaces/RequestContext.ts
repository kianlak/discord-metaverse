import { Message } from 'discord.js';

import type { UserContext } from './UserContext.js';

import { COMMANDS } from '../commands/constants/commandRegistry.js';

export interface RequestContext {
  requestId: string;
  user: UserContext;
  channelId: string;
  guildId: string | undefined;
  message: Message;
  commandName: keyof typeof COMMANDS | null;
  arguments: string[];
  createdAt: Date;
}
