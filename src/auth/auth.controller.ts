import { Controller, Get, Req, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserInfo } from './model/auth.model';

@Controller('kakao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  async kakaoLogin(@Res() res: Response) {
    const kakaoUrl = await this.authService.kakaoLogin();
    res.redirect(kakaoUrl);
  }

  @Get('/redirect')
  async kakaoOauthCallback(@Query('code') code: string, @Res() res: Response) {
    const userData = await this.authService.kakaoSignUp(code);
    const { accessToken, refreshToken, nickname, image } = userData;
    res.cookie('access_token', accessToken, {
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });
    const userInfo: UserInfo = {
      refreshToken,
      nickname,
      image,
    };
    res.send(userInfo);
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
