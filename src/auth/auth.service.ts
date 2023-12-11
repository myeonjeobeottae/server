import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType, UserData, UserKakaoInfo } from './model/auth.model';
import { HttpService } from '@nestjs/axios';
import kakaoConfig from '@config/kakao.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
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

    const { access_token, refresh_token } = tokenInfo;
    const kakaoTokenUserInfo = await this.httpService.axiosRef.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const userKakaoId = kakaoTokenUserInfo.data.id;

    const userKakaoInfo: UserKakaoInfo = {
      userKakaoId,
      nickname: kakaoTokenUserInfo.data.kakao_account.profile.nickname,
      image: kakaoTokenUserInfo.data.kakao_account.profile.profile_image_url,
      email: kakaoTokenUserInfo.data.email,
    };

    const userCheck = await this.findUser(userKakaoId);

    if (!userCheck) {
      const user = this.authRepository.create(userKakaoInfo);

      await this.authRepository.save(user);

      const userToken = this.generateJWT({
        kakaoId: user.userKakaoId,
        nickname: user.nickname,
      });

      const userData: UserData = {
        accessToken: userToken,
        refreshToken: refresh_token,
        userNickname: userKakaoInfo.nickname,
        userImage: userKakaoInfo.image,
      };
      return userData;
    }

    const userToken = this.generateJWT({
      kakaoId: userCheck.userKakaoId,
      nickname: userCheck.nickname,
    });

    const userData: UserData = {
      accessToken: userToken,
      refreshToken: refresh_token,
      userNickname: userKakaoInfo.nickname,
      userImage: userKakaoInfo.image,
    };
    return userData;
  }

  async findUser(kakaoId: string) {
    const user = await this.authRepository.findOne({
      where: { userKakaoId: kakaoId },
    });
    return user;
  }
}
