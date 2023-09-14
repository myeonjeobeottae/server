import { Inject, Injectable } from '@nestjs/common';
import { KakaoUserDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  generateJWT(payload) {
    return this.jwtService.sign(payload);
  }

  async OAuthLogin(userInfo: KakaoUserDto) {
    const { userKaKaoId } = userInfo;
    const userCheck = await this.findUser(userKaKaoId);
    if (!userCheck) {
      const user = this.userRepository.create(userInfo);
      await this.userRepository.save(user);
      return this.generateJWT({
        sub: user.userKaKaoId,
        nickname: user.nickname,
      });
    }
    return this.generateJWT({
      sub: userCheck.userKaKaoId,
      nickname: userCheck.nickname,
    });
  }

  async findUser(kakaoId: string) {
    const user = await this.userRepository.findOne({
      where: { userKaKaoId: kakaoId },
    });
    return user;
  }
}
