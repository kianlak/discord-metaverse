import { buildMainProfileEmbed } from "../../../ui/buildMainProfileEmbed.js";

import type { ProfilePage } from "../../../types/ProfilePage.js";
import type { UserContext } from "../../../../../../interfaces/UserContext.js";
import { ProfileService } from "../../../services/ProfileService.js";

export function handleProfileEmbedSelector(page: ProfilePage, target: UserContext) {
  const profileService = new ProfileService();

  switch (page) {
    case 'MAIN': {
      const stats = profileService.getMainProfileStats(target.id);
      return buildMainProfileEmbed(target, stats);
    }

    default:
      throw new Error(`Unhandled profile page: ${page}`);
  }
}