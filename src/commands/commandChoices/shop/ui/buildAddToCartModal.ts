import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

export function buildAddToCartModal(userId: string) {
  return new ModalBuilder()
    .setCustomId(`shop:add-to-cart-modal:${userId}`)
    .setTitle("Add Item to Cart")
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("item_id")
          .setLabel("Item ID")
          .setStyle(TextInputStyle.Short)
          .setPlaceholder("e.g. cbp1")
          .setRequired(true)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("quantity")
          .setLabel("Quantity")
          .setStyle(TextInputStyle.Short)
          .setPlaceholder("e.g. 1")
          .setRequired(true)
      )
    );
}
