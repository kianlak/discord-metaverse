export type BegResult =
  | {
      type: 'COOLDOWN';
      timeRemainingInMs: number;
    }
  | {
      type: 'SUCCESS';
      reward: number;
      newBalance: number;
      rewardFromAchievement?: number;
    };