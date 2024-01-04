import { UserDataDto } from 'src/application/dtos/user/user.dto';
import { UserTokenData } from 'src/domain/value-objects/user.vo';

export interface IUserAuthenticationService {
  kakaoLogin(): Promise<any>;
  kakaoSignUp(code: string): Promise<UserTokenData>;
  findUser(userId: string): Promise<UserDataDto>;
  renewToken(refreshToken: string): Promise<UserTokenData>;
}
