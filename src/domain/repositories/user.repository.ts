import { UserInfo, UserKakaoInfo } from '../interface/user.interface';

export interface UserRepository {
  userRegister(userInfo: UserKakaoInfo): Promise<UserKakaoInfo>;
  findUser(kakaoId: string): Promise<UserInfo>;
}
