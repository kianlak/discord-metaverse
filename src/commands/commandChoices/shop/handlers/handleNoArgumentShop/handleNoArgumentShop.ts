import { ShopSessionStore } from "../../shopSessions.js";
import { buildShopWelcomeEmbed } from "../../ui/buildShopWelcomeEmbed.js";
import { resolveCommandConfigFromChannel } from "../../../../helpers/resolveCommandConfigFromChannel.js";
import { buildShopWelcomeButtons } from "../../ui/buildShopWelcomeButtons.js";
import { buildThumbnailAttachments } from "../../../../../utils/setThumbnailImageFromPath.js";
import { dedupeAttachments } from "../../../../../utils/dedupeAttachments.js";
import { logger } from "../../../../../bot/logger/logger.js";

import type { RequestContext } from "../../../../../interfaces/RequestContext.js";
import type { ShopCommandConfig } from "../../interfaces/ShopCommandConfig.js";
import type { ThumbnailAttachable } from "../../../../../interfaces/ThumbnailAttachable.js";

import { SHOP_COMMAND_RULES } from "../../constants/SHOP_COMMAND_RULES.js";

export async function handleNoArgumentHelp(
  requestContext: RequestContext
) {
  const { user, message } = requestContext;

  logger.info(
    requestContext,
    `Checking for existing Shop Sessions`
  );

  const existingSession = ShopSessionStore.get(user.id);

  if (existingSession) {
    try {
      const channel = await message.channel.fetch();

      if (channel.isTextBased()) {
        const oldMessage = await channel.messages.fetch(
          existingSession.messageId
        );
        await oldMessage.delete();
      }
    } catch {
      // message already gone — ignore
    }

    ShopSessionStore.delete(user.id);

    logger.success(
      requestContext,
      `Removed previous Shop Session`
    );
  }

  const newShopSession = {
    userId: user.id,
    channelId: message.channelId,
    messageId: "",
    shoppingCart: {},
  };

  ShopSessionStore.set(newShopSession);

  const rule = SHOP_COMMAND_RULES[requestContext.channelId];

  const shopCommandConfig = resolveCommandConfigFromChannel(
    requestContext.channelId,
    rule,
    rule => ({ prompts: rule.prompts })) as ShopCommandConfig;


  const attachments = dedupeAttachments([
    ...buildThumbnailAttachments({
      thumbnailUrl: shopCommandConfig.thumbnailUrl,
      thumbnailAssetPath: shopCommandConfig.thumbnailAssetPath
    } as ThumbnailAttachable),
  ]);

  const shopMessage = await message.reply({
    embeds: [buildShopWelcomeEmbed(shopCommandConfig)],
    components: [buildShopWelcomeButtons(user.id)],
    files: attachments,
  });

  ShopSessionStore.set({
    ...newShopSession,
    messageId: shopMessage.id,
  });
}
