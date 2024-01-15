import {
  Email,
  Image,
  Nickname,
  RefreshToken,
  UserKakaoId,
  UserKakaoInfo,
} from './../../../domain/value-objects/user.vo';
import { Inject, Injectable } from '@nestjs/common';
import { IKakaoOauthService } from 'src/domain/contracts/kakaoOauth.interface';
import { UserService } from 'src/domain/services/user/user.service';
import { IUserAuthenticationService } from './UserAuthentication.interface';
import { AccessToken, UserTokenData } from 'src/domain/value-objects/user.vo';
import { UserDataDto } from 'src/application/dtos/user/user.dto';

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

  async kakaoSignUp(code: string, clientUrl: string): Promise<UserTokenData> {
    const kakaoTokenInfo = await this.kakaoOauthService.getKakaoTokenInfo(
      code,
      clientUrl,
    );

    const accessToken = new AccessToken(kakaoTokenInfo.access_token).getValue();
    const refreshToken = new RefreshToken(kakaoTokenInfo.refresh_token);

    const userInfo = await this.kakaoOauthService.getKakaoUserInfo(accessToken);

    const userKakaoId = new UserKakaoId(userInfo.getUserKakaoId().getValue());
    const userCheck = await this.userService.findUser(userKakaoId);

    if (!userCheck.getValue()) {
      const userRegister = await this.userService.userRegister(userInfo);

      const userKakao = new UserKakaoInfo(
        userRegister.getNickname(),
        userRegister.getImage(),
        userRegister.getUserKakaoId(),
        userRegister.getEmail(),
        refreshToken,
      );

      const userToken = this.userService.generateUserToken(userKakao);

      return userToken;
    }
    const userKakao = new UserKakaoInfo(
      new Nickname(userCheck.getValue().nickname),
      new Image(userCheck.getValue().image),
      new UserKakaoId(userCheck.getValue().userKakaoId),
      new Email(userCheck.getValue().email),
      refreshToken,
    );

    const userToken = this.userService.generateUserToken(userKakao);

    return userToken;
  }

  async renewToken(refreshToken: string): Promise<UserTokenData> {
    const renewToken = await this.kakaoOauthService.renewToken(refreshToken);

    const userInfo = await this.kakaoOauthService.getKakaoUserInfo(
      renewToken.getValue(),
    );
    const userKakaoInfo = new UserKakaoInfo(
      userInfo.getNickname(),
      userInfo.getImage(),
      userInfo.getUserKakaoId(),
      userInfo.getEmail(),
      new RefreshToken(refreshToken),
    );

    const generateUserToken = this.userService.generateUserToken(userKakaoInfo);

    return generateUserToken;
  }

  async findUser(kakaoId: string): Promise<UserDataDto> {
    const user = await this.userService.findUser(new UserKakaoId(kakaoId));
    const findUserInfo: UserDataDto = {
      nickname: user.getValue().nickname,
      image: user.getValue().image,
    };
    return findUserInfo;
  }
}
