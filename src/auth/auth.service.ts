import { Inject, Injectable } from '@nestjs/common';
import { KakaoUserDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from './model/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
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
}
