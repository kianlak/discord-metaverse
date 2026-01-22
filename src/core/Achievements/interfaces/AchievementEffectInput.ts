export interface AchievementEffectInputs {
  beg?: {
    rewardMultipliers: number[];
    rewardRangeBonuses: {
      min: number;
      max: number;
    }[];
  };
}