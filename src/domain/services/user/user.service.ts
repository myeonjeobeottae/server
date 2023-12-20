import { UserRepository } from 'src/domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { JwtPayloadType } from 'src/domain/interface/auth.interface';
import { UserData, UserKakaoInfo } from 'src/domain/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  private generateJWT(payload: JwtPayloadType) {
    return this.jwtService.sign(payload);
  }

  public generateUserToken(userKakaoInfo: UserKakaoInfo): UserData {
    const userToken = this.generateJWT({
      kakaoId: userKakaoInfo.userKakaoId,
      nickname: userKakaoInfo.nickname,
    });

    const userData: UserData = {
      accessToken: userToken,
      refreshToken: userKakaoInfo.refreshToken,
      nickname: userKakaoInfo.nickname,
      image: userKakaoInfo.image,
    };
    return userData;
  }

  async findUser(kakaoId: string): Promise<UserKakaoInfo> {
    const user = await this.userRepository.findUser(kakaoId);

    return user;
  }

  async userRegister(userKakaoInfo: UserKakaoInfo): Promise<UserKakaoInfo> {
    const user = await this.userRepository.userRegister(userKakaoInfo);

    return user;
  }
}
