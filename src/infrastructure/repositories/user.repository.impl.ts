import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserInfo } from 'src/domain/value-objects/userVO';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async userRegister(userInfo: UserInfo): Promise<UserInfo> {
    const user = this.userRepository.create(userInfo);

    const createUser = await this.userRepository.save(user);
    return createUser;
  }

  async findUser(kakaoId: string): Promise<UserInfo> {
    const user = await this.userRepository.findOne({
      where: { userKakaoId: kakaoId },
      // relations: ['customInterviews'],
    });

    if (!user) {
      throw new Error('가입된 유저가 없습니다.');
    }

    return user;
  }
}
