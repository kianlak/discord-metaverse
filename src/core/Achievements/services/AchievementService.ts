import { AchievementRepository } from "../repository/AchievementRepository.js";

import { resolveAchievementEffects } from "../resolveAchievementEffects.js";
import { buildBegAchievementContext } from "../../../commands/commandChoices/beg/achievements/utils/buildBegAchievementContext.js";

import type { AchievementContext } from "../interfaces/AchievementContext.js";
import type { AchievementEffectInputs } from "../interfaces/AchievementEffectInput.js";
import type { AchievementEvent } from "../types/AchievementEvent.js";
import type { AchievementAwardResult } from "../interfaces/AchievementAwardResult.js";

import { ACHIEVEMENTS } from "../constants/ACHIEVEMENTS.js";

export class AchievementService {
  private readonly repo: AchievementRepository;

  constructor(repo?: AchievementRepository) {
    this.repo = repo ?? new AchievementRepository();
  }

  getResolvedEffects(discordId: string): AchievementEffectInputs {
    const userTiers =
      this.repo.getUserAchievementTiersByDiscordId(discordId);

    return resolveAchievementEffects(userTiers);
  }

  evaluateAndAward(
    discordId: string,
    event: AchievementEvent
  ): AchievementAwardResult[] {
    const awarded: AchievementAwardResult[] = [];

    const userTiers =
      this.repo.getUserAchievementTiersByDiscordId(discordId);

    const relevant = ACHIEVEMENTS.filter(a =>
      a.events.includes(event)
    );

    let achievementContext: AchievementContext;
    switch (event) {
      case "beg:success":
        achievementContext = buildBegAchievementContext(discordId);
        break;
      default:
        return awarded;
    }

    for (const achievement of relevant) {
      const currentTier = userTiers[achievement.id] ?? 0;

      const nextTiers = achievement.tiers
        .filter(t => t.tier > currentTier)
        .sort((a, b) => b.tier - a.tier);

      let reachedTier:
        | typeof achievement.tiers[number]
        | undefined;

      for (const tier of nextTiers) {
        const passed = tier.check(achievementContext);

        if (passed) {
          reachedTier = tier;
          break;
        }
      }

      if (!reachedTier) continue;

      try {
        this.repo.setUserAchievementTierByDiscordId(
          discordId,
          achievement.id,
          reachedTier.tier
        );

        awarded.push({
          achievementId: achievement.id,
          tier: reachedTier.tier,
          tierDescription: reachedTier.description,
        });
      } catch (err) {
        console.error(
          "Failed to set achievement tier",
          {
            discordId,
            achievementId: achievement.id,
            tier: reachedTier.tier,
            err,
          }
        );
      }
    }

    return awarded;
  }
}
