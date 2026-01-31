import { getDiscordClient } from "../../../../../bot/client/registerDiscordClient.js";
import { buildProfileView } from "../../ui/buildProfileView.js";
import { buildInvalidUsageEmbed } from "../../../../ui/buildInvalidUsageEmbed.js";
import { getSystemPersona } from "../../../../../utils/getSystemPersona.js";
import { buildThumbnailAttachments } from "../../../../../utils/setThumbnailImageFromPath.js";
import { logger } from "../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { ThumbnailAttachable } from "../../../../../interfaces/ThumbnailAttachable.js";
import type { UserContext } from "../../../../../interfaces/UserContext.js";

import { COMMANDS } from "../../../../constants/commandRegistry.js";

export async function handleProfile(
  requestContext: RequestContext,
  targetUserId: string,
) {
  const client = getDiscordClient();
  const viewerId = requestContext.user.id;

  let targetUserContext: UserContext;

  if (targetUserId === viewerId) {
    targetUserContext = requestContext.user;
  } else {
    try {
      const user = await client.users.fetch(targetUserId);
  
      targetUserContext = {
        id: user.id,
        name: user.username,
        displayName: user.displayName,
        avatarURL: user.avatarURL(),
        avatarDecorationURL: user.avatarDecorationURL(),
        bannerURL: user.bannerURL(),
      };
    } catch {
      if (!requestContext.commandName ) return;

      const systemPersona = getSystemPersona();
      const chosenCommand = COMMANDS[requestContext.commandName];
      
      await requestContext.message.reply({
        embeds: [
          buildInvalidUsageEmbed(
            systemPersona, 
            requestContext.commandName,
            chosenCommand.usage
          )
        ],
        files: buildThumbnailAttachments({
          thumbnailUrl: systemPersona.thumbnailUrl,
          thumbnailAssetPath: systemPersona.thumbnailAssetPath
        } as ThumbnailAttachable),
      });
      return;
    }
  }

  const view = buildProfileView(
    viewerId,
    targetUserId,
    'MAIN',
    targetUserContext
  );

  await requestContext.message.reply(view);

  logger.success(
    requestContext, 
    `"${requestContext.commandName}" successfully executed`
  );
}