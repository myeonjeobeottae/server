// import jwtConfig from 'src/config/jwt.config';
// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Repository } from 'typeorm';
// import { Request } from 'express';
// import { User } from 'src/domain/entities/user.entity';
// import { JwtPayloadType } from '../../domain/interface/auth.interface';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     @Inject(jwtConfig.KEY)
//     private jwtConfigService: ConfigType<typeof jwtConfig>,
//     @Inject('USER_REPOSITORY')
//     private userRepository: Repository<User>,
//   ) {
//     const extractJwtFromCookie = (req: Request) => {
//       let token = null;
//       if (req && req.cookies) {
//         token = req.cookies['access_token'];
//       }

//       return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
//     };
//     super({
//       ignoreExpiration: false,
//       secretOrKey: jwtConfigService.secretOrKey,
//       jwtFromRequest: extractJwtFromCookie,
//     });
//   }

//   async validate(payload: JwtPayloadType) {
//     const user = await this.userRepository.findOne({
//       where: { userKakaoId: payload.kakaoId },
//     });
//     return {
//       userKaKaoId: payload.kakaoId,
//       nickname: payload.nickname,
//     };
//   }
// }
