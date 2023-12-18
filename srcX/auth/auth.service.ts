import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType, UserData, UserKakaoInfo } from './model/auth.model';
import { HttpService } from '@nestjs/axios';
import kakaoConfig from 'src/config/kakao.config';
import { ConfigType } from '@nestjs/config';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject(kakaoConfig.KEY)
    private kakaoOauthConfig: ConfigType<typeof kakaoConfig>,
  ) {}

  private generateJWT(payload: JwtPayloadType) {
    return this.jwtService.sign(payload);
  }

  async kakaoLogin(): Promise<any> {
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.kakaoOauthConfig.kakaoClientId}&redirect_uri=${this.kakaoOauthConfig.kakaoRedirectUrl}`;

    return kakaoUrl;
  }

  //이게 redirect로 왔을때 실행되는 함수
  async kakaoSignUp(code: string): Promise<UserData> {
    const kakaoTokenInfo = await this.getKakaoTokenInfo(code);

    const { access_token, refresh_token } = kakaoTokenInfo;
    const userInfo = await this.getKakaoUserInfo(access_token);

    const userCheck = await this.findUser(userInfo.userKakaoId);

    if (!userCheck) {
      const createUser = await this.createUser(userInfo);
      const userKakaoInfo: UserKakaoInfo = {
        ...createUser,
        refreshToken: refresh_token,
      };
      const userToken = this.generateUserToken(userKakaoInfo);

      return userToken;
    }
    const userKakaoInfo: UserKakaoInfo = {
      ...userCheck,
      refreshToken: refresh_token,
    };
    const userToken = this.generateUserToken(userKakaoInfo);
    return userToken;
  }

  private generateUserToken(userKakaoInfo: UserKakaoInfo): UserData {
    const userToken = this.generateJWT({
      kakaoId: userKakaoInfo.userKakaoId,
      nickname: userKakaoInfo.nickname,
    });

    const userData: UserData = {
      accessToken: userToken,
      refreshToken: userKakaoInfo.refreshToken,
      nickname: userKakaoInfo.nickname,
      image: userKakaoInfo.image,
    };
    return userData;
  }

  async findUser(kakaoId: string): Promise<UserKakaoInfo> {
    const user = await this.authRepository.findUser(kakaoId);
    return user;
  }

  async createUser(userKakaoInfo: UserKakaoInfo): Promise<UserKakaoInfo> {
    const user = await this.authRepository.authCreate(userKakaoInfo);

    return user;
  }

  private async getKakaoTokenInfo(code: string): Promise<any> {
    const kakaoTokenInfo = await this.httpService.axiosRef.post(
      `https://kauth.kakao.com/oauth/token`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
      {
        params: {
          grant_type: 'authorization_code',
          client_id: this.kakaoOauthConfig.kakaoClientId,
          redirect_uri: this.kakaoOauthConfig.kakaoRedirectUrl,
          code,
        },
      },
    );
    const tokenInfo = kakaoTokenInfo.data;
    return tokenInfo;
  }

  // Promise<UserKakaoInfo>
  private async getKakaoUserInfo(accessToken: string): Promise<any> {
    const kakaoTokenUserInfo = await this.httpService.axiosRef.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    // const userKakaoInfo: UserKakaoInfo = {
    //   userKakaoId: kakaoTokenUserInfo.data.id,
    //   nickname: kakaoTokenUserInfo.data.kakao_account.profile.nickname,
    //   image: kakaoTokenUserInfo.data.kakao_account.profile.profile_image_url,
    //   email: kakaoTokenUserInfo.data.email,
    // };

    return kakaoTokenUserInfo;
  }
}
