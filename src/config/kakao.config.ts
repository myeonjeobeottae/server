import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  kakaoClientId: process.env.KAKAO_CLIENT_ID,
  kakaoRedirectUrlLocal: process.env.KAKAO_REDIRECTURL_LOCAL,
  kakaoRedirectUrl: process.env.KAKAO_REDIRECTURL,
}));
