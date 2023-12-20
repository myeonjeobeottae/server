import { Module } from '@nestjs/common';
import { UserProvider } from 'src/infrastructure/database/user.repository.provider';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';
import { UserAuthenticationService } from 'src/application/services/user/userAuthentication.service';
import { DatabaseModule } from './database.module';
import { UserService } from 'src/domain/services/user/user.service';
import { UserAuthenticationController } from 'src/adapters/controllers/userAuthentication.controller';
import { AuthModule } from './auth.module';
import { JwtModule } from './jwt.module';

@Module({
  imports: [AuthModule, DatabaseModule, JwtModule],
  controllers: [UserAuthenticationController],
  providers: [
    UserAuthenticationService,
    ...UserProvider,

    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'IUserAuthenticationService',
      useClass: UserAuthenticationService,
    },
  ],
  exports: ['IUserAuthenticationService', UserService],
})
export class UserModule {}
