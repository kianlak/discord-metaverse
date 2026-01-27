import { LeaderboardRepository } from '../repository/leaderboardRepository.js';

import type { LeaderboardData } from '../interfaces/LeaderboardData.js';
import type { DiscordUserResolver } from '../../../../interfaces/DiscordUserResolver.js';

export class LeaderboardService {
  constructor(
    private readonly repo = new LeaderboardRepository(),
    private readonly userResolver: DiscordUserResolver
  ) {}

  async getBalehBucksLeaderboard(
    limit = 10
  ): Promise<LeaderboardData[]> {
    const rows = this.getLeaderboardEntries(limit);

    const leaderboardDataResult: LeaderboardData[] = [];

    let rank = 1;

    for (const row of rows) {
      const resolved = await this.userResolver.resolveUser(row.discordId);

      leaderboardDataResult.push({
        rank,
        username: resolved?.username ?? 'Unknown User',
        avatarUrl:
          resolved?.avatarUrl ??
          'https://cdn.discordapp.com/embed/avatars/0.png',
        balehBucks: row.balehBucks,
      });

      rank++;
    }

    return leaderboardDataResult;
  }

  getLeaderboardEntries(limit = 10) {
    return this.repo.getLeaderboard(limit);
  }
}
