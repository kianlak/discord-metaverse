import { balehPouch } from "../../commands/commandChoices/use/functions/consumables/balehPouch.js";
import { buildBalehPouchEmbed } from "../../commands/commandChoices/use/functions/consumables/ui/buildBalehPouchEmbed.js";
import type { ThumbnailAttachable } from "../../interfaces/ThumbnailAttachable.js";
import { getSystemPersona } from "../../utils/getSystemPersona.js";
import { buildThumbnailAttachments } from "../../utils/setThumbnailImageFromPath.js";

import type { ItemDefinition } from "../interfaces/ItemDefinition.js";

const ITEM_BASE_PATHS = {
  common: 'src/assets/images/items/common',
  uncommon: 'src/assets/images/items/uncommon',
  rare: 'src/assets/images/items/rare',
  epic: 'src/assets/images/items/epic',
  legendary: 'src/assets/images/items/legendary'
}

export const ITEMS: ItemDefinition[] = [
  {
    item_id: "ktcm1",
    item_name: "Thanos Casino Membership",
    description: "Use to unlock Thanos Casino",
    value: 1500,
    item_type: "KEY",
    rarity: "COMMON",
    sellable: false,
    buyable: false,
    tradable: false,
    oneTimeBuy: true,
    itemBasePath: ITEM_BASE_PATHS.common,

    use: async () => { return true; },
  },

  {
    item_id: "cbp1",
    item_name: "Baleh Pouch",
    description: "Use to gain 1-50 coins from the pouch",
    value: 25,
    item_type: "CONSUMABLE",
    rarity: "COMMON",
    sellable: true,
    sellPrice: 13,
    buyable: true,
    maxBuyableDaily: 3,
    tradable: false,
    oneTimeBuy: false,
    itemBasePath: ITEM_BASE_PATHS.common,

    use: async ({ user, requestContext }) => {
      const systemPersona = getSystemPersona();
      const { reward, newBalance } = await balehPouch(user.id);

      const embed = buildBalehPouchEmbed(reward, newBalance, systemPersona);
      await requestContext.message.reply({ 
        embeds: [embed], 
        files: buildThumbnailAttachments({
            thumbnailUrl: systemPersona.thumbnailUrl,
            thumbnailAssetPath: systemPersona.thumbnailAssetPath,
          } as ThumbnailAttachable),
        });

      return true;
    },
  },
];
