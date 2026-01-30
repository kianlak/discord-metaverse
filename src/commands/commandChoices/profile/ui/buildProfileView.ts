import { buildProfileDropdown } from "../ui/buildProfileDropdown.js";
import { handleProfileEmbedSelector } from "../handlers/handleProfile/handlers/handleProfileEmbedSelection.js";

import type { ProfilePage } from "../types/ProfilePage.js";
import type { UserContext } from "../../../../interfaces/UserContext.js";

export function buildProfileView(
  viewerId: string,
  targetUserId: string,
  page: ProfilePage,
  targetUserContext: UserContext
) {
  const embed = handleProfileEmbedSelector(page, targetUserContext);

  return {
    embeds: [embed],
    components: [
      buildProfileDropdown(viewerId, targetUserId, page),
    ],
  };
}