import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { UserKakaoInfo } from './model/auth.model';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
  ) {}

  async authCreate(userKakaoInfo: UserKakaoInfo): Promise<UserKakaoInfo> {
    const user = this.authRepository.create(userKakaoInfo);

    const createUser = await this.authRepository.save(user);
    return createUser;
  }

  async findUser(kakaoId: string): Promise<UserKakaoInfo> {
    const user = await this.authRepository.findOne({
      where: { userKakaoId: kakaoId },
      relations: ['customInterviews'],
    });

    if (!user) {
      throw new Error('가입된 유저가 없습니다.');
    }

    return user;
  }
}
