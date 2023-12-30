import { Controller, Get, Req, Res, Query, Inject } from '@nestjs/common';
import { Response } from 'express';
import { UserDataDto } from 'src/application/dtos/user/user.dto';
import { IUserAuthenticationService } from 'src/application/services/user/UserAuthentication.interface';
// import { UserData, UserInfo } from 'src/domain/interface/user.interface';
import { Image, Nickname, UserData } from 'src/domain/value-objects/user.vo';

@Controller('kakao')
export class UserAuthenticationController {
  constructor(
    @Inject('IUserAuthenticationService')
    private userAuthenticationService: IUserAuthenticationService,
  ) {}

  @Get('/login')
  async kakaoLogin(@Res() res: Response) {
    const kakaoUrl = await this.userAuthenticationService.kakaoLogin();
    res.redirect(kakaoUrl);
  }

  @Get('/redirect')
  async kakaoOauthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    const userTokenData = await this.userAuthenticationService.kakaoSignUp(
      code,
    );
    const accessToken = userTokenData.getAccessToken().getValue();
    const refreshToken = userTokenData.getRefreshToken().getValue();
    res.cookie('access_token', accessToken, {
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('refresh_token', refreshToken, {
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });

    const userData: UserDataDto = {
      nickname: userTokenData.getNickname().getValue(),
      image: userTokenData.getImage().getValue(),
    };

    res.send(userData);
  }

  @Get('/status')
  async user(@Req() req: any) {
    if (req.user) {
      console.log(req.user, 'Authenticated User');
      return {
        msg: 'Authenticated',
      };
    } else {
      console.log(req.user, 'User cannot found');
      return {
        msg: 'Not Authenticated',
      };
    }
  }
}
