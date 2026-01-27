import { Message } from "discord.js";
import { shouldHandleMessage } from "../helpers/shouldHandleMessage.js";
import { requestContextFromMessage } from "../../helper/requestContextFromMessage.js";
import { commandRouter } from "../../../commands/commandRouter.js";
import { isUserEnsured } from "../../infra/ensuredUsers.js";
import { userBootstrap } from "../../infra/bootstrap/userBootstrap.js";
import { logger } from "../../logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";

export async function handleMessageCommandEntry(message: Message) {
  if (!shouldHandleMessage(message)) return;

  const requestContext: RequestContext = requestContextFromMessage(message);

  logger.info(
    requestContext, 
    `Received "${requestContext.message.content}"`
  );

  const userId = requestContext.user.id;

  if (!isUserEnsured(userId)) userBootstrap(requestContext.user);

  await commandRouter(requestContext);
}
