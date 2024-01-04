import { AccessToken, CreateUserInfo } from '../value-objects/user.vo';

export interface IKakaoOauthService {
  kakaoLogin(): Promise<any>;
  getKakaoTokenInfo(code: string): Promise<any>;
  getKakaoUserInfo(accessToken: string): Promise<CreateUserInfo>;
  renewToken(refreshToken: string): Promise<AccessToken>;
}
