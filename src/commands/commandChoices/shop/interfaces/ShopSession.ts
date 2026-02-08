export interface ShopSession {
  userId: string;
  messageId: string;
  shoppingCart: Record<string, number>;
}
