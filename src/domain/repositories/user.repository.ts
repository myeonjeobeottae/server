import { UserInfo } from '../value-objects/userVO';

export interface UserRepository {
  userRegister(userInfo: UserInfo): Promise<UserInfo>;
  findUser(kakaoId: string): Promise<UserInfo>;
}
