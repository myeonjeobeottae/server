import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import kakaoConfig from 'src/config/kakao.config';
import { ConfigType } from '@nestjs/config';
import { IKakaoOauthService } from '../../../domain/contracts/kakaoOauth.interface';
import {
  CreateUserInfo,
  Email,
  Image,
  Nickname,
  UserKakaoId,
} from 'src/domain/value-objects/user.vo';

@Injectable()
export class KakaoOauthService implements IKakaoOauthService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(kakaoConfig.KEY)
    private kakaoOauthConfig: ConfigType<typeof kakaoConfig>,
  ) {}

  public async kakaoLogin(): Promise<any> {
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.kakaoOauthConfig.kakaoClientId}&redirect_uri=${this.kakaoOauthConfig.kakaoRedirectUrl}`;

    return kakaoUrl;
  }

  public async getKakaoTokenInfo(code: string): Promise<any> {
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

  public async getKakaoUserInfo(accessToken: string): Promise<CreateUserInfo> {
    const kakaoTokenUserInfo = await this.httpService.axiosRef.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const userKakaoInfo = new CreateUserInfo(
      new Nickname(kakaoTokenUserInfo.data.kakao_account.profile.nickname),
      new Image(
        kakaoTokenUserInfo.data.kakao_account.profile.profile_image_url,
      ),
      new UserKakaoId(kakaoTokenUserInfo.data.id),
      new Email(kakaoTokenUserInfo.data.email),
    );

    return userKakaoInfo;
  }
}
