import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoAuthGuard } from './kakao/kakao-auth.guard';
import { Response } from 'express';

@Controller('kakao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @UseGuards(KakaoAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async kakaoLogin() {}

  @Get('/redirect')
  @UseGuards(KakaoAuthGuard)
  async kakaoOauthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.OAuthLogin(req.user);
    res.cookie('access_token', token, {
      maxAge: 3600000,
      sameSite: true,
      secure: false,
      //secure: ture,//https 할때 사용
    });

    // return res.status(HttpStatus.OK).send();
    return res.redirect('http://localhost:3000');
    // return res.json(token);
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
