export interface IKakaoOauthService {
  kakaoLogin(): Promise<any>;
  getKakaoTokenInfo(code: string): Promise<any>;
  getKakaoUserInfo(accessToken: string): Promise<any>;
}
