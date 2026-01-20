export interface UserContext {
  id: string;
  name: string;
  displayName: string;
  avatarURL: string | null;
  avatarDecorationURL: string | null;
  bannerURL: string | null | undefined;
}