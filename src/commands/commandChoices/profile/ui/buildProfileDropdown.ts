import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import type { ProfilePage } from '../types/ProfilePage.ts';

export function buildProfileDropdown(
  viewerId: string,
  targetId: string,
  activePage: ProfilePage
) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`profile:menu:${viewerId}:${targetId}`)
      .setPlaceholder('📂 View profile section')
      .addOptions([
        {
          label: 'Main Profile',
          value: 'MAIN',
          emoji: '👤',
          default: activePage === 'MAIN',
        },
      ])
  );
}
