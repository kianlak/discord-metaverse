import { InventoryService } from "../../inventory/services/inventoryService.js";

import { getSystemPersona } from "../../../../utils/getSystemPersona.js";
import { buildThumbnailAttachments } from "../../../../utils/setThumbnailImageFromPath.js";
import { useItem } from "../helpers/useItem.js";
import { buildNoItemOwnedEmbed } from "../ui/buildNoItemOwnedEmbed.js";

import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { ThumbnailAttachable } from "../../../../interfaces/ThumbnailAttachable.js";
import { buildAlreadyUsedKeyItemEmbed } from "../ui/buildAlreadyUsedKeyItemEmbed.js";
import { getItemById } from "../../inventory/helpers/itemRegistry.js";

export async function handleUse(
  requestContext: RequestContext,
  itemId: string,
) {
  const inventoryService = new InventoryService();
  const userId = requestContext.user.id;

  const ownedQuantity = inventoryService.getUserItemQuantity(userId, itemId);
  const systemPersona = getSystemPersona();

  if (ownedQuantity <= 0) {
    if (!requestContext.commandName) return;

    await requestContext.message.reply({
      embeds: [
        buildNoItemOwnedEmbed(
          systemPersona,
          itemId
        ),
      ],
      files: buildThumbnailAttachments({
        thumbnailUrl: systemPersona.thumbnailUrl,
        thumbnailAssetPath: systemPersona.thumbnailAssetPath,
      } as ThumbnailAttachable),
    });

    return;
  }

  try {
    const { alreadyUsed } = await useItem({
      requestContext,
      itemId,
    });

    const item = getItemById(itemId);

    if (alreadyUsed && item) {
      await requestContext.message.reply({
        embeds: [buildAlreadyUsedKeyItemEmbed(systemPersona, itemId, item.item_name)],
        files: buildThumbnailAttachments({
          thumbnailUrl: systemPersona.thumbnailUrl,
          thumbnailAssetPath: systemPersona.thumbnailAssetPath,
        } as ThumbnailAttachable),
      });
      return;
    }
  } catch (error: any) {
    await requestContext.message.reply(
      `❌ ${error?.message ?? "That item usage failed"}`
    );
  }
}