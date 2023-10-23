import jwtConfig from '@config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { JwtPayloadType } from '../model/auth.model';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfigService: ConfigType<typeof jwtConfig>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
  ) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secretOrKey,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayloadType) {
    const user = await this.authRepository.findOne({
      where: { userKakaoId: payload.kakaoId },
    });
    return {
      userKaKaoId: payload.kakaoId,
      nickname: payload.nickname,
    };
  }
}
