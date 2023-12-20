import { CustomInterviewRepositoryImpl } from './../infrastructure/repositories/customInterview.repository.impl';
import { Module } from '@nestjs/common';
import { UserProvider } from 'src/infrastructure/database/user.repository.provider';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';
import { UserAuthenticationService } from 'src/application/services/user/userAuthentication.service';
import { DatabaseModule } from './database.module';
import { JwtModule } from './jwt.module';
import {
  CustomInterviewProvider,
  UrlInterviewProvider,
} from 'src/infrastructure/database/interview.repository.provider';
import { InterviewsController } from 'src/adapters/controllers/interview.controller';
import { InterviewsService } from 'src/application/services/interview/interview.service';
import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { UserModule } from './user.module';

@Module({
  imports: [DatabaseModule, JwtModule, UserModule],
  controllers: [InterviewsController],
  providers: [
    ...CustomInterviewProvider,
    ...UrlInterviewProvider,
    CustomInterviewsService,
    {
      provide: 'CustomInterviewRepository',
      useClass: CustomInterviewRepositoryImpl,
    },
    {
      provide: 'IInterviewService',
      useClass: InterviewsService,
    },
  ],
  exports: ['IInterviewService'],
})
export class InterviewModule {}
