export interface AchievementEffects {
  beg?: {
    rewardMultiplierBonus? : {
      multiplier?: number;
    }
    rewardRangeBonus?: {
      min: number;
      max: number;
    };
  };
}
