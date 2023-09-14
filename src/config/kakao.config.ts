import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  kakaoClientId: process.env.KAKAO_CLIENT_ID,
  kakaoRedirectUrl: process.env.KAKAO_REDIRECTURL,
}));
