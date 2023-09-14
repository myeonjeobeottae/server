import { ConfigModule, ConfigType } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/auth.kakaoStrategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './serializer';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';
import { UserProvider } from './user.provider';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@config/jwt.config';
import { JwtStrategy } from './strategy/jwtStrategy';

@Module({
  imports: [
    // PassportModule.register({
    //   session: true,
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secretOrKey,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [jwtConfig.KEY],
    }),
    DbModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoStrategy,
    ...UserProvider,
    SessionSerializer,
    JwtStrategy,
  ],
})
export class AuthModule {}
