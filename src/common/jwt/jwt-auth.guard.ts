import jwtConfig from 'src/config/jwt.config';
import {
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwt: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (authorization === undefined) {
      request.user = null;
      console.log('토큰 없음');
    }
    const token = authorization.replace('Bearer', '').trim();
    request.user = this.validateToken(token);
    return true;
  }
  validateToken(token: string) {
    const secretKey = this.jwt.secretOrKey;
    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.name) {
        case 'JsonWebTokenError': // 일반적인 JWT 오류의 이름
          throw new HttpException('유효하지 않은 토큰입니다.', 401);

        case 'TokenExpiredError': // 토큰 만료 오류의 이름
          throw new HttpException('토큰이 만료되었습니다.', 410);

        // 여기에 추가적인 JWT 관련 오류들을 추가할 수 있습니다.

        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
