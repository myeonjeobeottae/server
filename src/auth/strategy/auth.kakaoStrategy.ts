import { AuthService } from '../auth.service';
import kakaoConfig from '@config/kakao.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao-oauth2';
import { KakaoUserDto } from '../dto/create-auth.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject(kakaoConfig.KEY)
    private kakaoOauthConfig: ConfigType<typeof kakaoConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: kakaoOauthConfig.kakaoClientId,
      callbackURL: kakaoOauthConfig.kakaoRedirectUrl,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;
      const { nickname, profile_image } = _json.properties;
      const user: KakaoUserDto = {
        email: profile?.kakao_account?.email ?? null,
        userKaKaoId: _json.id,
        nickname: nickname,
        image: profile_image,
        accessToken,
        refreshToken,
      };

      done(null, user, accessToken);
    } catch (err) {
      done(err, false);
    }
  }
}
