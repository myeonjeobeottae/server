export interface UserData {
  refreshToken?: string;
  nickname: string;
  image: string;
}

export interface UserTokenData extends UserData {
  accessToken: string;
}

export interface UserKakaoInfo extends UserData {
  userKakaoId: string;
  email: string;
}

export interface UserInfo extends UserKakaoInfo {
  id: number;
}
