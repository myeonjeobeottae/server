import { UserData } from 'src/domain/interface/user.interface';

export interface IUserAuthenticationService {
  kakaoLogin(): Promise<any>;
  kakaoSignUp(code: string): Promise<UserData>;
}
