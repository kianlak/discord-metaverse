import { UserService } from "../../../core/User/services/UserService.js";

import { addEnsuredUser, isUserEnsured } from "../ensuredUsers.js";
import { logger } from "../../logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";

export function userBootstrap(requestContext: RequestContext) {
  const userId = requestContext.user.id;
  const username = requestContext.user.name;

  if (isUserEnsured(userId)) return;

  const userService = new UserService();

  try {
    userService.ensureUserIsCreated(requestContext);
      
    addEnsuredUser(userId);

    logger.info(`User is ensured, caching [${username}]:`, { userId: userId });
  } catch (error) {
    logger.error(`User bootstrap failed`, error as Error);
  }
}
