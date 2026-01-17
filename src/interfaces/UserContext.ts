export interface UserContext {
  userId: string;
  username: string;
  userAvatarURL: string | null;
  userAvatarDecorationURL: string | null;
  userBannerURL: string | null | undefined;
}