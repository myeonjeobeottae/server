export interface JwtPayloadType {
  kakaoId: string;
  nickname: string;
}

export interface User extends JwtPayloadType {
  iat: number;
  exp: number;
}

export interface UserInfo {
  refreshToken: string;
  userNickname: string;
  userImage: string;
}

export interface UserData extends UserInfo {
  accessToken: string;
}

export interface UserKakaoInfo {
  userKakaoId: string;
  nickname: string;
  image: string;
  email: string;
}
