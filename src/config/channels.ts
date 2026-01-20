export const CHANNELS = {
  DEV_TEST: requireEnv('DISCORD_DEV_TEST_CHANNEL_ID'),
  BOLBI_SHOP: requireEnv('BOLBI_SHOP_CHANNEL_ID'),
} as const;

export const VALID_CHANNELS = new Set<string>(
  Object.values(CHANNELS)
);

export type ChannelKey = keyof typeof CHANNELS;

function requireEnv(key: string): string {
  const value = process.env[key];
  
  if (!value) throw new Error(`Missing env var: ${key}`);

  return value;
}
