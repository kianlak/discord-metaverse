import path from "node:path";
import { fileURLToPath } from "node:url";
import { AttachmentBuilder } from "discord.js";

import type { ThumbnailAttachable } from "../interfaces/ThumbnailAttachable.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildThumbnailAttachments(
  thumbnailMetadata: ThumbnailAttachable
): AttachmentBuilder[] {
  if (
    !thumbnailMetadata.thumbnailUrl?.startsWith("attachment://") ||
    !thumbnailMetadata.thumbnailAssetPath
  ) {
    return [];
  }

  return [
    new AttachmentBuilder(
      path.resolve(
        __dirname,
        "../../",
        thumbnailMetadata.thumbnailAssetPath
      ),
      {
        name: thumbnailMetadata.thumbnailUrl.replace("attachment://", ""),
      }
    ),
  ];
}
