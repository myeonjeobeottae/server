import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserInfo, UserKakaoInfo } from 'src/domain/interface/user.interface';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async userRegister(userInfo: UserKakaoInfo): Promise<UserKakaoInfo> {
    const user = this.userRepository.create(userInfo);

    const createUser = await this.userRepository.save(user);
    return createUser;
  }

  async findUser(kakaoId: string): Promise<UserInfo> {
    console.log('kakaoId');

    const user = await this.userRepository.findOne({
      select: ['id', 'userKakaoId', 'nickname', 'email', 'image'],
      where: { userKakaoId: kakaoId },
      // relations: ['interviews'],
    });

    // if (!user) {
    //   throw new Error('가입된 유저가 없습니다.');
    // }

    return user;
  }
}
