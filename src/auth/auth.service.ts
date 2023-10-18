import { Inject, Injectable } from '@nestjs/common';
import { KakaoUserDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './model/auth.model';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import kakaoConfig from '@config/kakao.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject(kakaoConfig.KEY)
    private kakaoOauthConfig: ConfigType<typeof kakaoConfig>,
  ) {}

  generateJWT(payload: JwtPayloadType) {
    return this.jwtService.sign(payload);
  }

  async OAuthLogin(userInfo: KakaoUserDto) {
    const { userKaKaoId } = userInfo;

    const userCheck = await this.findUser(userKaKaoId);

    if (!userCheck) {
      const user = this.authRepository.create(userInfo);
      await this.authRepository.save(user);
      return this.generateJWT({
        kakaoId: user.userKaKaoId,
        nickname: user.nickname,
      });
    }
    return this.generateJWT({
      kakaoId: userCheck.userKaKaoId,
      nickname: userCheck.nickname,
    });
  }

  async findUser(kakaoId: string) {
    const user = await this.authRepository.findOne({
      where: { userKaKaoId: kakaoId },
    });
    return user;
  }

  // async kakaoLogin(): Promise<Observable<AxiosResponse<any, any>>> {
  //   const code = this.httpService.get(
  //     `https://kauth.kakao.com/oauth/authorize?client_id=8bf32c7eb886bbd4e40c43b9bbce3ca3&redirect_uri=http://localhost:3000/kakao/redirect&response_type=code`,
  //   );
  //   return code;
  // }

  // async kakaoSignUp(
  //   code: string,
  // ): Promise<Observable<AxiosResponse<any, any>>> {
  //   const token = await this.httpService
  //     .post(`https://kauth.kakao.com/oauth/token
  //   ?grant_type=authorization_code
  //   &client_id=8bf32c7eb886bbd4e40c43b9bbce3ca
  //   &redirect_url=http://localhost:3000/kakao/redirect
  //   &code=${code}`);
  //   console.log(code);

  //   return token;
  // }
}
