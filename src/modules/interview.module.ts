import { CustomInterviewRepositoryImpl } from '../infrastructure/repositories/interview/custom-interview.repository.impl';
import { Module } from '@nestjs/common';
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
import { OpenAIModule } from './openAI.module';
import { QuestionModule } from './question.module';
import { UrlInterviewRepositoryImpl } from 'src/infrastructure/repositories/interview/url-interview.repository.impl';
import { UrlInterviewsService } from 'src/domain/services/interview/url-interview.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
    UserModule,
    OpenAIModule,
    QuestionModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [InterviewsController],
  providers: [
    ...CustomInterviewProvider,
    ...UrlInterviewProvider,
    CustomInterviewsService,
    UrlInterviewsService,
    {
      provide: 'CustomInterviewRepository',
      useClass: CustomInterviewRepositoryImpl,
    },
    {
      provide: 'UrlInterviewRepository',
      useClass: UrlInterviewRepositoryImpl,
    },
    {
      provide: 'IInterviewService',
      useClass: InterviewsService,
    },
  ],
  exports: ['IInterviewService'],
})
export class InterviewModule {}
