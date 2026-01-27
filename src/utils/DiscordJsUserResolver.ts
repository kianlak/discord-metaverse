import { getDiscordClient } from '../bot/client/registerDiscordClient.js';
import { getCachedUser, setCachedUser } from './DiscordUserIImageCache.js';

import type { DiscordUserResolver } from '../interfaces/DiscordUserResolver.js';

export class DiscordJsUserResolver implements DiscordUserResolver {
  async resolveUser(discordId: string) {
    const cached = getCachedUser(discordId);
    if (cached) return cached;
    
    const client = getDiscordClient();
    
    try {
      const user = await client.users.fetch(discordId);

      const resolved = {
        username: user.username,
        avatarUrl: user.displayAvatarURL({
          extension: 'png',
          size: 128,
        }),
      };

      setCachedUser(discordId, resolved);
      
      return resolved;
    } catch {
      return null;
    }
  }
}
