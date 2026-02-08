import { ShopSessionStore } from "../../shopSessions.js";
import { buildShopCheckoutEmbed } from "../../ui/buildShopCheckoutEmbed.js";
import { buildShopCheckoutButtons } from "../../ui/buildShopCheckoutButtons.js";

import type { ButtonInteraction } from "discord.js";

export async function handleShopCheckoutButton(
  interaction: ButtonInteraction,
) {
  const [, , ownerId] = interaction.customId.split(":");

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: "❌ You can't checkout someone else's cart.",
      ephemeral: true,
    });
    return;
  }

  const session = ShopSessionStore.get(ownerId);

  if (!session) {
    await interaction.reply({
      content: "❌ Shop session expired.",
      ephemeral: true,
    });
    return;
  }

  await interaction.deferUpdate();

  await interaction.message.edit({
    embeds: [buildShopCheckoutEmbed(session.shoppingCart)],
    components: [buildShopCheckoutButtons(ownerId)],
  });
}
