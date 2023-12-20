import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoOauthService } from 'src/infrastructure/external-services/kakaoOauth/kakaoOauth.service';
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [
    {
      provide: 'IKakaoOauthService',
      useClass: KakaoOauthService,
    },
  ],
  exports: ['IKakaoOauthService', HttpModule],
})
export class AuthModule {}
