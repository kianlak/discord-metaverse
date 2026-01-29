import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { getSystemPersona } from "../../../../utils/getSystemPersona.js";

export function buildLeaderboardEmbed(
  imageBuffer: Buffer,
  context?: {
    username: string;
    rank?: number;
    balehBucks?: number;
  }
) {
  const systemPersona = getSystemPersona();

  const leaderboardAttachment = new AttachmentBuilder(imageBuffer, {
    name: "baleh-leaderboard.png",
  });

  const embed = new EmbedBuilder()
    .setColor(0xfde047)
    .setTitle("🏆 Baleh Bucks Leaderboard")
    .setImage("attachment://baleh-leaderboard.png")
    .setFooter({ text: systemPersona.footer })
    .setTimestamp();

  if (systemPersona.thumbnailUrl) {
    embed.setThumbnail(systemPersona.thumbnailUrl);
  }

  if (context) {
    if (context.rank && context.rank > 0) {
      embed.setDescription(
        [
          `You're currently ranked \`#${context.rank}\` 💰`,
          `Balance: \`${context.balehBucks?.toLocaleString()} Baleh Bucks\``,
        ].join("\n")
      );
    } else {
      embed.setDescription(
        [
          `You're not in the top 10 yet`,
          "Keep earning Baleh Bucks to climb the leaderboard 💸",
          "",
          "_Only the top 10 are shown here._",
        ].join("\n")
      );
    }
  }

  return {
    embed,
    leaderboardAttachment,
    personaThumbnail:
      systemPersona.thumbnailUrl &&
      systemPersona.thumbnailAssetPath
        ? {
            thumbnailUrl: systemPersona.thumbnailUrl,
            thumbnailAssetPath: systemPersona.thumbnailAssetPath,
          }
        : undefined,
  };
}