import jStat from 'jstat';

interface TierConfig {
  multiplier: number;
  upper: number;
  threshold: number;
}

export function calculateBegEfficiency(
  begs: number,
  totalProfit: number,
  tier4Roll: number | null,
): {
  percentile: number;
  zScore: number;
} {
  const tiers: TierConfig[] = [
    { multiplier: 1,    upper: 100, threshold: 50 },
    { multiplier: 1.1,  upper: 100, threshold: 50 },
    { multiplier: 1.15, upper: 100, threshold: 50 },
    { multiplier: 1.25, upper: 100, threshold: 100 },
    { multiplier: 1.45, upper: 125, threshold: 0 },
  ];

  if (tier4Roll === null) tier4Roll = 0;

  if (tier4Roll > 250 && tiers[3]) {
    tiers[3].threshold += tier4Roll - 250;
  }

  const userAvg = totalProfit / begs;

  let avg = 0;
  let variance = 0;
  let remaining = begs;

  for (const tier of tiers) {
    if (remaining <= 0) break;

    const { multiplier, upper, threshold } = tier;

    const isLast = tier === tiers[tiers.length - 1];

    const sub = isLast
      ? remaining
      : Math.min(remaining, threshold);
      
    const mean = (1 + upper) / 2;

    avg += mean * multiplier * sub;

    variance +=
      (sub / begs) *
      ((upper * multiplier) ** 2 - 1) /
      12;

    remaining -= sub;
  }

  avg /= begs;
  variance /= begs;

  const stdDev = Math.sqrt(variance);

  const z = (userAvg - avg) / stdDev;

  const percentile = jStat.normal.cdf(z, 0, 1) * 100;

  return {
    percentile,
    zScore: z,
  };
}