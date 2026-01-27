import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { resolveCategories } from "../helpers/resolveCategories.js";

export function buildHelpCategorySelect(
  selectedCategory: string
) {
  const categories = resolveCategories();

  const select = new StringSelectMenuBuilder()
    .setCustomId("help:select-category")
    .setPlaceholder("Select a command category")
    .addOptions(
      categories.map(category => ({
        label: category.name,
        value: category.name,
        emoji: category.emoji,
        default:
          category.name.toLowerCase() ===
          selectedCategory.toLowerCase(),
      }))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(select);
}
