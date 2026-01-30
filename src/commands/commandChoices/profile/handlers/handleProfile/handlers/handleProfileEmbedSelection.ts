import { buildMainProfileEmbed } from "../../../ui/buildMainProfileEmbed.js";

import type { ProfilePage } from "../../../types/ProfilePage.js";
import type { UserContext } from "../../../../../../interfaces/UserContext.js";
import { ProfileService } from "../../../services/ProfileService.js";
import { logger } from "../../../../../../bot/logger/logger.js";

export function handleProfileEmbedSelector(page: ProfilePage, target: UserContext) {
  const profileService = new ProfileService();

  logger.info(
    `Routing to ${target.name}'s ${page} page`
  );

  switch (page) {
    case 'MAIN': {
      const stats = profileService.getMainProfileStats(target.id);
      return buildMainProfileEmbed(target, stats);
    }

    default:
      throw new Error(`Unhandled profile page: ${page}`);
  }
}