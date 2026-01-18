export interface UserContext {
  id: string;
  name: string;
  userAvatarURL: string | null;
  userAvatarDecorationURL: string | null;
  userBannerURL: string | null | undefined;
}