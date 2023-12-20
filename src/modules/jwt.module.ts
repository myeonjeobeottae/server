import jwtConfig from 'src/config/jwt.config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule as jwt } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';

@Global()
@Module({
  imports: [
    jwt.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secretOrKey,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  providers: [JwtAuthGuard],
  exports: [jwt, JwtAuthGuard],
})
export class JwtModule {}
