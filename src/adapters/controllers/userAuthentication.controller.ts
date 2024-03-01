import {
  Controller,
  Get,
  Req,
  Res,
  Query,
  Inject,
  UseGuards,
  HttpException,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  UserDataDto,
  UserTokenDataDto,
} from 'src/application/dtos/user/user.dto';
import { IUserAuthenticationService } from 'src/application/services/user/UserAuthentication.interface';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { User } from 'src/domain/interface/auth.interface';

@Controller('kakao')
export class UserAuthenticationController {
  constructor(
    @Inject('IUserAuthenticationService')
    private userAuthenticationService: IUserAuthenticationService,
  ) {}

  @ApiTags('Authentication')
  @Get('/login')
  @Redirect()
  async kakaoLogin() {
    const kakaoUrl = await this.userAuthenticationService.kakaoLogin();
    return { url: kakaoUrl };
  }

  @ApiTags('Authentication')
  @Get('/redirect')
  async kakaoOauthCallback(
    @Query('code') code: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const clientUrl = req.headers.origin;

    const userTokenData = await this.userAuthenticationService.kakaoSignUp(
      code,
      clientUrl,
    );

    res.cookie('refresh_token', userTokenData.getRefreshToken().getValue(), {
      maxAge: 3600000,
      sameSite: 'none',
      secure: true,
    });

    const userData: UserTokenDataDto = {
      nickname: userTokenData.getNickname().getValue(),
      image: userTokenData.getImage().getValue(),
      accessToken: userTokenData.getAccessToken().getValue(),
    };

    res.send(userData);
  }

  @ApiTags('Authentication')
  @ApiResponse({
    description: 'refresh token으로 토큰 재 발급',
  })
  @Get('/renew/token')
  async renewToken(@Req() req: Request): Promise<UserTokenDataDto | void> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new HttpException('refresh token이 없습니다.', 403);
    }

    const renewToken = await this.userAuthenticationService.renewToken(
      refreshToken,
    );

    const userData: UserTokenDataDto = {
      nickname: renewToken.getNickname().getValue(),
      image: renewToken.getImage().getValue(),
      accessToken: renewToken.getAccessToken().getValue(),
    };

    return userData;
  }

  @ApiTags('User')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 정보 찾기',
  })
  @Get('/user')
  async findUser(@Req() req: Request): Promise<UserDataDto> {
    const { kakaoId } = req.user as User;
    const findUser = this.userAuthenticationService.findUser(kakaoId);
    return findUser;
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    res.clearCookie('refresh_token', {
      sameSite: 'none',
      secure: true,
    });

    return res.send('logout');
  }
}
