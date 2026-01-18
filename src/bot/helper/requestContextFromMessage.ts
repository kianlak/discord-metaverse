import { Message } from "discord.js";
import { randomUUID } from "node:crypto";
import { userContextFromMessage } from "./userContextFromMessage.js";
import { processRequestMessage } from "../client/helpers/processMessageCommand.js";

import type { RequestContext } from "../../interfaces/RequestContext.js";

export function requestContextFromMessage(message: Message): RequestContext {
  const { commandName, commandArguments } = processRequestMessage(message);

  return {
    requestId: randomUUID(),
    user: userContextFromMessage(message),
    channelId: message.channelId,
    guildId: message.guildId ?? undefined,
    message,
    arguments: commandArguments,
    commandName,
    createdAt: new Date(),
  };
}