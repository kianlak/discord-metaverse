import type { Achievement } from "../../../../../core/Achievements/interfaces/Achievement.js";

export const MASTER_BEGGAR: Achievement = {
  id: 'master_beggar',
  name: 'Master Beggar',
  description: "You're now more skilled at begging!",
  events: ['beg:success'],
  badgeBasePath: 'src/assets/images/achievements/masterBeggar',
  tiers: [
    {
      tier: 1,
      description: 'Beg rewards increased by \`10%\`',
      check: context => (context.beg?.totalBegs ?? 0) >= 50,
      effects: {
        beg: {
          rewardMultiplierBonus: {
            multiplier: 1.10,
          },
        },
      },
    },
    {
      tier: 2,
      description: 'Beg rewards increased by \`15%\`',
      check: context => (context.beg?.totalBegs ?? 0) >= 100,
      effects: {
        beg: {
          rewardMultiplierBonus: {
            multiplier: 1.15,
          },
        },
      },
    },
    {
      tier: 3,
      description: 'Beg rewards increased by \`25%\`',
      check: context => (context.beg?.totalBegs ?? 0) >= 150,
      effects: {
        beg: {
          rewardMultiplierBonus: {
            multiplier: 1.25,
          },
        },
      },
    },
    {
      tier: 4,
      description: 'You can now beg to get anywhere from \`1-125\` baleh bucks, and you beg rewards increase by \`45%\`',
      check: context => (
        (context.beg?.totalBegs ?? 0) >= 250) &&
        (context.beg?.totalBegProfit ?? 0) >= 14375,
      effects: {
        beg: {
          rewardMultiplierBonus: {
            multiplier: 1.45,
          },
          rewardRangeBonus: {
            min: 1,
            max: 126,
          },
        },
      },
    },
  ],
};
