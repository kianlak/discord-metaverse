export interface DiscordUserResolver {
  resolveUser(discordId: string): Promise<{
    username: string;
    avatarUrl: string;

  } | null>;
}
