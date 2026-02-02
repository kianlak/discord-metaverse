import type { AchievementContext } from "./AchievementContext.js";
import type { AchievementEffects } from "./AchievementEffect.js";

export interface AchievementTier {
  tier: number;
  description: string;
  check(achievementContext: AchievementContext): boolean;
  effects?: AchievementEffects;
}
