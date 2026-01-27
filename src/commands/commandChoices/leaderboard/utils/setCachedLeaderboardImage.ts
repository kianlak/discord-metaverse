let cachedHash: string | null = null;
let cachedImage: Buffer | null = null;

export function setCachedLeaderboardImage(
  hash: string,
  image: Buffer
) {
  cachedHash = hash;
  cachedImage = image;
}
