import { handleProfile } from "./handlers/handleProfile/handleProfile.js";
import { logger } from "../../../bot/logger/logger.js";

import type { RequestContext } from "../../../interfaces/RequestContext.js";
import type { ProfileCommand } from "./types/ProfileCommand.js";
import { removeLiveRequest } from "../../../bot/infra/liveRequests.js";

export async function executeProfile(
  command: ProfileCommand,
  requestContext: RequestContext
) {
  let targetUserId: string;

  switch (command.form) {
    case 'NO_ARGUMENTS':
      targetUserId = requestContext.user.id;
      break;

    case 'TARGET_USER':
      targetUserId = command.targetUserId;
      break;

    default:
      return;
  }

  await handleProfile(
    requestContext,
    targetUserId
  );

  removeLiveRequest(requestContext.user.id, requestContext.commandName);
}