import { buildAddToCartModal } from "../../ui/buildAddToCartModal.js";

import type { ButtonInteraction } from "discord.js";

export async function handleShopAddToCartButton(
  interaction: ButtonInteraction
) {
  const [, , ownerId] = interaction.customId.split(":");

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: "❌ You can't use someone else's shop menu",
      ephemeral: true,
    });
    return;
  }

  await interaction.showModal(
    buildAddToCartModal(ownerId)
  );
}