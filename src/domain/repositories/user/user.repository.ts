import { User } from '../../entities/user.entity';
import { CreateUserInfo, UserKakaoId } from '../../value-objects/user.vo';

export interface UserRepository {
  userRegister(userInfo: CreateUserInfo): Promise<User>;
  findUser(kakaoId: UserKakaoId): Promise<User>;
}
