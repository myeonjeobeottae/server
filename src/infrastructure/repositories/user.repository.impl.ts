import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import {
  CreateUserInfo,
  Email,
  UserInstance,
  UserKakaoId,
  Image,
  Nickname,
} from 'src/domain/value-objects/user.vo';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async userRegister(userInfo: CreateUserInfo): Promise<User> {
    const user = this.userRepository.create({
      userKakaoId: userInfo.getUserKakaoId().getValue(),
      image: userInfo.getImage().getValue(),
      nickname: userInfo.getNickname().getValue(),
      email: userInfo.getEmail().getValue(),
    });
    const createUser = await this.userRepository.save(user);

    return createUser;
  }

  async findUser(kakaoId: UserKakaoId): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['userKakaoId', 'nickname', 'email', 'image'],
      where: { userKakaoId: kakaoId.getValue() },
    });
    return user;
  }
}
