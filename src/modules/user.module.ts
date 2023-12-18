import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../src/common/jwt/jwtStrategy';
import { JwtAuthGuard } from '../../src/common/jwt/jwt-auth.guard';
import { UserProvider } from 'src/infrastructure/database/user.repository.provider';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ...UserProvider,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [],
})
export class UserModule {}
