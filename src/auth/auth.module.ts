import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './kakao/auth.kakaoStrategy';
import { SessionSerializer } from './serializer';
import { AuthProvider } from './auth.provider';
import { DbModule } from 'src/db/db.module';
import { JwtStrategy } from './jwt/jwtStrategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { KakaoAuthGuard } from './kakao/kakao-auth.guard';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule, DbModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoStrategy,
    ...AuthProvider,
    SessionSerializer,
    JwtStrategy,
    JwtAuthGuard,
    KakaoAuthGuard,
  ],
})
export class AuthModule {}
