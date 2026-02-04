import { getDiscordClient } from "../../../../bot/client/registerDiscordClient.js";
import { buildProfileView } from "../ui/buildProfileView.js";

import type { StringSelectMenuInteraction } from "discord.js";
import type { ProfilePage } from "../types/ProfilePage.js";
import type { UserContext } from "../../../../interfaces/UserContext.js";

export async function handleProfileCategorySelect(
  interaction: StringSelectMenuInteraction
) {
  const [, , ownerId, targetUserId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: `❌ You can't interact with someone else's profile`,
      ephemeral: true,
    });
    return;
  }

  const page = interaction.values[0] as ProfilePage;

  if (!targetUserId) return;

  const client = getDiscordClient();
  let targetUserContext: UserContext;

  const user = await client.users.fetch(targetUserId);
  
  targetUserContext = {
    id: user.id,
    name: user.username,
    displayName: user.displayName,
    avatarURL: user.avatarURL(),
    avatarDecorationURL: user.avatarDecorationURL(),
    bannerURL: user.bannerURL(),
  }

  const view = buildProfileView(
    ownerId,
    targetUserId,
    page,
    targetUserContext
  );

  await interaction.update(view);
}