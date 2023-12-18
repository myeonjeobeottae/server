import { CustomInterviews } from 'src/custom-interviews/entities/customInterviews.entity';

export interface JwtPayloadType {
  kakaoId: string;
  nickname: string;
}

export interface User extends JwtPayloadType {
  iat: number;
  exp: number;
}

export interface UserInfo {
  refreshToken?: string;
  nickname: string;
  image: string;
}

export interface UserData extends UserInfo {
  accessToken: string;
}

export interface UserKakaoInfo extends UserInfo {
  id: number;
  userKakaoId: string;
  email: string;
  customInterviews: CustomInterviews[];
}
