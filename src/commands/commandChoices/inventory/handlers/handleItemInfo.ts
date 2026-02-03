import { getItemById } from "../helpers/itemRegistry.js";
import { getSystemPersona } from "../../../../utils/getSystemPersona.js";
import { buildItemInfoEmbed } from "../ui/buildItemInfoEmbed.js";
import { buildUnrecognizedItem } from "../ui/buildUnrecognizedItem.js";
import { buildThumbnailAttachments } from "../../../../utils/setThumbnailImageFromPath.js";

import type { RequestContext } from "../../../../interfaces/RequestContext.js";
import type { ThumbnailAttachable } from "../../../../interfaces/ThumbnailAttachable.js";

export async function handleItemInfo(
  requestContext: RequestContext,
  itemId: string
) {
  const item = getItemById(itemId);
  const systemPersona = getSystemPersona();

  if (!item) {
    await requestContext.message.reply({
      embeds: [buildUnrecognizedItem(systemPersona, itemId)],
      files: buildThumbnailAttachments({
        thumbnailUrl: systemPersona.thumbnailUrl,
        thumbnailAssetPath: systemPersona.thumbnailAssetPath,
      } as ThumbnailAttachable),
    });
    return;
  }

  await requestContext.message.reply({
    embeds: [buildItemInfoEmbed(item)],
    files: [`${item.itemBasePath}/${item.item_id}.png`],
  });
}
