import { Message } from "discord.js";
import { shouldHandleMessage } from "../helpers/shouldHandleMessage.js";
import { requestContextFromMessage } from "../../helper/requestContextFromMessage.js";
import { commandRouter } from "../../../commands/commandRouter.js";
import { logger } from "../../logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";

export async function handleMessageCommandEntry(message: Message) {
  if (!shouldHandleMessage(message)) return;

  const requestContext: RequestContext = requestContextFromMessage(message);

  logger.info(requestContext, `Received "${requestContext.message.content}"`);


  // userBootstrap(userContextFromMessage(message));
  await commandRouter(requestContext);
}
