import type { Interaction } from "discord.js";
import type { UserContext } from "../../interfaces/UserContext.js";

export function userContextFromInteraction(interaction: Interaction): UserContext | null {
  if (!interaction.user) return null;

  return {
    id: interaction.user.id,
    name: interaction.user.username,
    displayName: interaction.user.displayName,
    avatarURL: interaction.user.avatarURL(),
    avatarDecorationURL: interaction.user.avatarDecorationURL(),
    bannerURL: interaction.user.bannerURL(),
  };
}