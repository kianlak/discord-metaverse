import type { AchievementEvent } from "../types/AchievementEvent.js";
import type { AchievementTier } from "./AchievementTier.js";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  events: AchievementEvent[];
  badgeBasePath: string;
  tiers: AchievementTier[];
}