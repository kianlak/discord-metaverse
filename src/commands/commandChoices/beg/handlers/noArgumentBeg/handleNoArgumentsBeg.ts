import { BegService } from "../../services/BegService.js";
import { UserService } from "../../../../../core/User/services/UserService.js";

import { resolveCommandConfigFromChannel } from "../../../../helpers/resolveCommandConfigFromChannel.js";
import { handleBegCooldown } from "./handlers/handleBegCooldown.js";
import { handleBegSuccess } from "./handlers/handleBegSuccess.js";
import { removeLiveRequest } from "../../../../../bot/infra/liveRequests.js";
import { logger } from "../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { BegCommandConfig } from "../../interfaces/BegCommandConfig.js";
import type { BegResult } from "../../types/BegResult.js";

import { BEG_COMMAND_RULES } from "../../constants/BEG_COMMAND_RULES.js";
import { CHANNELS } from "../../../../../config/channels.js";

export async function handleBeg(requestContext: RequestContext) {
  const begService = new BegService(new UserService());

  const begResult = begService.beg(requestContext.user.id) as BegResult;

  const rule = BEG_COMMAND_RULES[requestContext.channelId];

  const begCommandConfig = resolveCommandConfigFromChannel(
    begResult.type !== 'COOLDOWN' ? requestContext.channelId : CHANNELS.DEV_TEST,
    rule,
    rule => ({ prompts: rule.prompts })) as BegCommandConfig;

  switch (begResult.type) {
    case 'COOLDOWN':
      await handleBegCooldown(
        requestContext,
        begCommandConfig,
        begResult
      );

      break;

    case 'SUCCESS':
      await handleBegSuccess(
        requestContext,
        begCommandConfig,
        begResult
      );

      break;
  }
    
  logger.info(
    requestContext,
    `Removing user ${requestContext.user.name}'s live request from set`,
    { 
      userId: requestContext.user.id,
      requestId: requestContext.requestId,
      channelName: requestContext.channelId,
      commandName: requestContext.commandName,
      arguments: requestContext.arguments
    }
  );

  removeLiveRequest(requestContext.user.id, requestContext.commandName);

  return;
}
