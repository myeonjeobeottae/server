import { UserTokenData } from 'src/domain/value-objects/user.vo';

export interface IUserAuthenticationService {
  kakaoLogin(): Promise<any>;
  kakaoSignUp(code: string): Promise<UserTokenData>;
}
