import type { AchievementContext } from "./AchievementContext.js";
import type { AchievementEffects } from "./AchievementEffect.js";

export interface AchievementTier {
  tier: number;
  description: string;
  check(ctx: AchievementContext): boolean;
  effects?: AchievementEffects;
}
