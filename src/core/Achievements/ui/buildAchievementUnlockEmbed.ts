import { EmbedBuilder } from 'discord.js';

import type { Achievement } from '../interfaces/Achievement.js';

export function buildAchievementUnlockedEmbed(
  achievementName: string,
  tier: number,
  tierDescription: string
) {
  return new EmbedBuilder()
    .setColor(0xf1c40f)
    .setTitle('🏆 Achievement Unlocked!')
    .setDescription(
      `**${achievementName}** — \`Tier ${tier}\`\n\n${tierDescription}`
    )
    .setThumbnail(`attachment://tier-${tier}.png`)
    .setTimestamp();
}
