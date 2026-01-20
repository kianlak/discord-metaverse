import { HEADSHOTS_BASE_PATH } from "./index.js";

export const HEADSHOTS = {
  METAVERSE_MANAGER: {
    fileName: 'metaverseManagerHeadshot.png',
    path: `${HEADSHOTS_BASE_PATH}/metaverseManagerHeadshot.png`,
    attachmentName: 'metaverseManager.png',
  },

  BOLBI: {
    fileName: 'bolbiHeadshot.png',
    path: `${HEADSHOTS_BASE_PATH}/bolbiHeadshot.png`,
    attachmentName: 'bolbi.png',
  },
} as const;

export type HeadshotKey = keyof typeof HEADSHOTS;
export type Headshot = (typeof HEADSHOTS)[HeadshotKey];