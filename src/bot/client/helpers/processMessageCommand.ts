import { Message } from "discord.js";

import { COMMANDS } from "../../../commands/commandRegistry.js";
import { COMMAND_PREFIX } from "../../constants/COMMAND_PREFIX.js";
import { COMMAND_ALIASES } from "../../../commands/commandAliases.js";

export function processMessageCommand(message: Message): {
  commandName: keyof typeof COMMANDS | null;
  commandArguments: string[];
} {
  const content = message.content.trim();
  const tokens = content.split(/\s+/);

  let commandName: keyof typeof COMMANDS | null = null;
  let commandArguments: string[] = [];

  const firstToken = tokens[0];

  if (!firstToken) return { commandName, commandArguments };

  const rawCommand = firstToken.slice(COMMAND_PREFIX.length).toLowerCase();

  const resolvedCommandName = COMMAND_ALIASES[rawCommand];
  
  if (!resolvedCommandName) return { commandName, commandArguments };

  commandName = resolvedCommandName;
  commandArguments = tokens.slice(1);

  return { commandName, commandArguments };
}