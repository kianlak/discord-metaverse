import { UserService } from "../../../core/User/services/UserService.js";

import { addEnsuredUser, isUserEnsured } from "../ensuredUsers.js";
import { logger } from "../../logger/logger.js";

import type { UserContext } from "../../../interfaces/UserContext.js";

export function userBootstrap(user: UserContext) {
  const userId = user.id;
  const username = user.name;

  if (isUserEnsured(userId)) return;

  const userService = new UserService();

  try {
    userService.ensureUserIsCreated(user);
      
    addEnsuredUser(userId);

    logger.info(`User is ensured, caching [${username}]:`, { userId: userId });
  } catch (error) {
    logger.error(`User bootstrap failed`, error as Error);
  }
}
