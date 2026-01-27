type CachedUser = {
  username: string;
  avatarUrl: string;
  expiresAt: number;
};

const USER_TTL_MS = 150 * 60 * 1000;

const userCache = new Map<string, CachedUser>();

export function getCachedUser(discordId: string) {
  const cached = userCache.get(discordId);
  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    userCache.delete(discordId);
    return null;
  }

  return cached;
}

export function setCachedUser(
  discordId: string,
  user: { username: string; avatarUrl: string }
) {
  userCache.set(discordId, {
    ...user,
    expiresAt: Date.now() + USER_TTL_MS,
  });
}
