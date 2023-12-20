export interface JwtPayloadType {
  kakaoId: string;
  nickname: string;
}

export interface User extends JwtPayloadType {
  iat: number;
  exp: number;
}
