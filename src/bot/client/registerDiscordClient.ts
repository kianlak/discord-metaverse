import type { Client } from 'discord.js';

let clientInstance: Client | null = null;

export function registerDiscordClient(client: Client) {
  clientInstance = client;
}

export function getDiscordClient(): Client {
  if (!clientInstance) {
    throw new Error('Discord client not registered. Did you forget to call registerDiscordClient()?');
  }

  return clientInstance;
}
