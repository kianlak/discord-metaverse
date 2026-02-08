import { handleAddToCartModal } from "../handlers/buy/handleAddToCartModal.js";
import { handleShopAddToCartButton } from "../handlers/buy/handleShopAddToCartButton.js";
import { handleShopBuyConfirmButton } from "../handlers/buy/handleShopBuyConfirmButton.js";
import { handleShopCheckoutButton } from "../handlers/buy/handleShopCheckoutButton.js";
import { handleShopItemTypeSelect } from "../handlers/buy/handleShopItemTypeSelect.js";
import { handleShopWelcomeButtons } from "../handlers/handleShopWelcomeButtons.js";

import type { Interaction } from "discord.js";

export async function shopInteractionRouter(interaction: Interaction) {
  if (interaction.isButton()) {
    const [, action] = interaction.customId.split(":");

    switch (action) {
      case "buy":
        await handleShopWelcomeButtons(interaction);
        return;

      case "add-to-cart":
        await handleShopAddToCartButton(interaction);
        return;

      case "checkout":
        await handleShopCheckoutButton(interaction);
        return;

      case "confirm":
        await handleShopBuyConfirmButton(interaction);
        return;

      default:
        return;
    }
  }

  if (interaction.isStringSelectMenu()) {
    const [, action] = interaction.customId.split(":");

    switch (action) {
      case "item-type":
        await handleShopItemTypeSelect(interaction);
        return;

      default:
        return;
    }
  }

  if (interaction.isModalSubmit()) {
    const [, action] = interaction.customId.split(":");

    switch (action) {
      case "add-to-cart-modal":
        await handleAddToCartModal(interaction);
        return;
      
      default:
        return;
    }
  }
}
