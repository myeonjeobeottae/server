import { Inject, Injectable } from '@nestjs/common';
import { IKakaoOauthService } from 'src/domain/contracts/kakaoOauth.interface';
import { UserService } from 'src/domain/services/user/user.service';
import {
  UserData,
  UserInfo,
  UserKakaoInfo,
  UserTokenData,
} from 'src/domain/interface/user.interface';
import { IUserAuthenticationService } from './UserAuthentication.interface';

@Injectable()
export class UserAuthenticationService implements IUserAuthenticationService {
  constructor(
    private userService: UserService,
    @Inject('IKakaoOauthService')
    private kakaoOauthService: IKakaoOauthService,
  ) {}

  async kakaoLogin(): Promise<any> {
    const kakaoUrl = this.kakaoOauthService.kakaoLogin();
    return kakaoUrl;
  }

  async kakaoSignUp(code: string): Promise<UserTokenData> {
    const kakaoTokenInfo = await this.kakaoOauthService.getKakaoTokenInfo(code);

    const { access_token, refresh_token } = kakaoTokenInfo;

    const userInfo = await this.kakaoOauthService.getKakaoUserInfo(
      access_token,
    );

    const userCheck = await this.userService.findUser(userInfo.userKakaoId);

    if (!userCheck) {
      const userRegister = await this.userService.userRegister(userInfo);
      const userKakaoInfo: UserKakaoInfo = {
        ...userRegister,
        refreshToken: refresh_token,
      };
      const userToken = this.userService.generateUserToken(userKakaoInfo);

      return userToken;
    }
    const userKakaoInfo: UserInfo = {
      ...userCheck,
      refreshToken: refresh_token,
    };
    const userToken = this.userService.generateUserToken(userKakaoInfo);

    return userToken;
  }
}
