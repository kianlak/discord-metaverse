import { buildUnknownCommandEmbed } from "../ui/buildUnknownCommandEmbed.js";

import { buildThumbnailAttachments } from "../../../../utils/setThumbnailImageFromPath.js";

import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { UnknownCommandConfig } from "../interfaces/UnknwonCommandConfig.js";
import type { ThumbnailAttachable } from "../../../../interfaces/ThumbnailAttachable.js";

import { UNKNOWN_COMMAND_RULES } from "../constants/UNKNOWN_COMMAND_RULES.js";
import { resolveCommandConfigFromChannel } from "../../../helpers/resolveCommandConfigFromChannel.js";

export function handleUnknownCommand(requestContext: RequestContext) {
  const rule = UNKNOWN_COMMAND_RULES[requestContext.channelId];

  const unknownCommandConfig = resolveCommandConfigFromChannel(
    requestContext.channelId,
    rule,
    rule => ({ prompts: rule.prompts })
  ) as UnknownCommandConfig;
  
  if (!unknownCommandConfig) return;

  requestContext.message.reply({
    embeds: [buildUnknownCommandEmbed(unknownCommandConfig)],
    files: buildThumbnailAttachments({
      thumbnailUrl: unknownCommandConfig.thumbnailUrl,
      thumbnailAssetPath: unknownCommandConfig.thumbnailAssetPath
    } as ThumbnailAttachable),
  });
}