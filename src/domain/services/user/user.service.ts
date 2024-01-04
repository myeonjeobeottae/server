import { UserRepository } from 'src/domain/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/domain/interface/auth.interface';

import {
  AccessToken,
  CreateUserInfo,
  Email,
  Image,
  Nickname,
  UserInstance,
  UserKakaoId,
  UserKakaoInfo,
  UserTokenData,
} from 'src/domain/value-objects/user.vo';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  private generateJWT(payload: JwtPayloadType) {
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  }

  public generateUserToken(userKakaoInfo: UserKakaoInfo): UserTokenData {
    const userToken = this.generateJWT({
      kakaoId: userKakaoInfo.getUserKakaoId().getValue(),
      nickname: userKakaoInfo.getNickname().getValue(),
    });

    const accessToken = new AccessToken(userToken);

    const userTokenData = new UserTokenData(
      userKakaoInfo.getNickname(),
      userKakaoInfo.getImage(),
      accessToken,
      userKakaoInfo.getRefreshToken(),
    );

    return userTokenData;
  }

  async findUser(kakaoId: UserKakaoId): Promise<UserInstance> {
    const user = await this.userRepository.findUser(kakaoId);

    return new UserInstance(user);
  }

  async userRegister(userKakaoInfo: CreateUserInfo): Promise<CreateUserInfo> {
    const user = await this.userRepository.userRegister(userKakaoInfo);

    const userRegister = new CreateUserInfo(
      new Nickname(user.nickname),
      new Image(user.image),
      new UserKakaoId(user.userKakaoId),
      new Email(user.email),
    );
    return userRegister;
  }
}
