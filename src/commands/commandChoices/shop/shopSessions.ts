import type { ShopSession } from "./interfaces/ShopSession.js";

const shopSessions = new Map<string, ShopSession>();

export const ShopSessionStore = {
  get(userId: string): ShopSession | undefined {
    return shopSessions.get(userId);
  },

  set(session: ShopSession): void {
    shopSessions.set(session.userId, session);
  },

  delete(userId: string): void {
    shopSessions.delete(userId);
  },
};
