import type { AchievementEffectInputs } from "./interfaces/AchievementEffectInput.js";

import { ACHIEVEMENTS } from "./constants/ACHIEVEMENTS.js";

export function resolveAchievementEffects(
  userTiers: Record<string, number>
): AchievementEffectInputs {
  const resolved: AchievementEffectInputs = {};

  for (const achievement of ACHIEVEMENTS) {
    const achievedTier = userTiers[achievement.id];
    if (!achievedTier) continue;

    for (const tier of achievement.tiers) {
      if (tier.tier > achievedTier || !tier.effects) continue;

      const effects = tier.effects;

      if (effects.beg) {
        resolved.beg ??= {
          rewardMultipliers: [],
          rewardRangeBonuses: [],
        };

        if (effects.beg.rewardMultiplierBonus?.multiplier) {
          resolved.beg.rewardMultipliers.push(
            effects.beg.rewardMultiplierBonus.multiplier
          );
        }

        if (effects.beg.rewardRangeBonus) {
          resolved.beg.rewardRangeBonuses.push(
            effects.beg.rewardRangeBonus
          );
        }
      }
    }
  }

  return resolved;
}