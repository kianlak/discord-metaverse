let cachedHash: string | null = null;
let cachedImage: Buffer | null = null;

export function getCachedLeaderboardImage(hash: string): Buffer | null {
  if (cachedHash === hash && cachedImage) {
    return cachedImage;
  }
  return null;
}