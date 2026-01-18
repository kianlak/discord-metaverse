import { Message } from "discord.js";

import type { UserContext } from "../../interfaces/UserContext.js";

export function userContextFromMessage(message: Message): UserContext {
  return {
    id: message.author.id,
    name: message.author.username,
    userAvatarURL: message.author.avatarURL(),
    userAvatarDecorationURL: message.author.avatarDecorationURL(),
    userBannerURL: message.author.bannerURL(),
  };
}