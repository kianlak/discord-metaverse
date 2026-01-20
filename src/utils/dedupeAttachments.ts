import type { AttachmentBuilder } from "discord.js";

export function dedupeAttachments(attachments: AttachmentBuilder[]): AttachmentBuilder[] {
  const seen = new Set<string>();

  return attachments.filter(attachment => {
    const name = attachment.name;
    if (!name) return true;

    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}
