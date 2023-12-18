import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Auth } from 'srcX/auth/entities/auth.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async serializeUser(
    user: Auth,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    console.log('serializeUser', user);
    done(null, user);
  }
  async deserializeUser(
    payload: any,
    done: (err: any, user?: any) => void,
  ): Promise<any> {
    const user = await this.authService.findUser(payload.sub);
    console.log(user, 'deserializeUser');
    return user ? done(null, user) : done(null, null);
  }
}
