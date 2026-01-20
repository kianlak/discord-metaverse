import { Message } from "discord.js";

import type { UserContext } from "../../interfaces/UserContext.js";

export function userContextFromMessage(message: Message): UserContext {
  return {
    id: message.author.id,
    name: message.author.username,
    displayName: message.author.displayName,
    avatarURL: message.author.avatarURL(),
    avatarDecorationURL: message.author.avatarDecorationURL(),
    bannerURL: message.author.bannerURL(),
  };
}