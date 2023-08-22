import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
})
export class UserModule {}
