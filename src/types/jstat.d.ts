declare module 'jstat' {
  interface NormalDistribution {
    cdf(x: number, mean: number, std: number): number;
  }

  interface JStat {
    normal: NormalDistribution;
  }

  const jStat: JStat;

  export = jStat;
}
