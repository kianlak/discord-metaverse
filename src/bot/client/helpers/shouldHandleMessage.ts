import { Message } from "discord.js";

import { VALID_CHANNELS } from "../../../config/index.js";
import { COMMAND_PREFIX } from "../../constants/COMMAND_PREFIX.js";

export function shouldHandleMessage(message: Message): boolean {
  if (message.author.bot) return false;
  if (!message.content.startsWith(COMMAND_PREFIX)) return false;
  if (!VALID_CHANNELS.has(message.channelId)) return false;

  return true;
}