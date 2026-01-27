import crypto from 'crypto';

export interface LeaderboardHashRow {
  discordId: string;
  balehBucks: number;
}

export function hashLeaderboard(
  rows: LeaderboardHashRow[]
): string {
  const hash = crypto.createHash('sha256');

  for (const row of rows) {
    hash.update(row.discordId);
    hash.update(':');
    hash.update(row.balehBucks.toString());
    hash.update('|');
  }

  return hash.digest('hex');
}
