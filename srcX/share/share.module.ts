import jwtConfig from 'src/config/jwt.config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secretOrKey,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  exports: [JwtModule],
})
export class ShareModule {}
