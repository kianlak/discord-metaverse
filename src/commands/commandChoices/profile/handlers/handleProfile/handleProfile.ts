import { getDiscordClient } from "../../../../../bot/client/registerDiscordClient.js";
import { buildProfileView } from "../../ui/buildProfileView.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { UserContext } from "../../../../../interfaces/UserContext.js";
import { logger } from "../../../../../bot/logger/logger.js";

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
    const user = await client.users.fetch(targetUserId);

    targetUserContext = {
      id: user.id,
      name: user.username,
      displayName: user.displayName,
      avatarURL: user.avatarURL(),
      avatarDecorationURL: user.avatarDecorationURL(),
      bannerURL: user.bannerURL(),
    };
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