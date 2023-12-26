import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { JwtModule } from './jwt.module';
import { CustomInterviewQuestionRepositoryImpl } from 'src/infrastructure/repositories/question/custom-interview-question.repository.impl';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CustomInterviewQuestionProvider,
  UrlInterviewQuestionProvider,
} from 'src/infrastructure/database/question.repository.provider';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [],
  providers: [
    ...CustomInterviewQuestionProvider,
    ...UrlInterviewQuestionProvider,
    CustomInterviewQuestionService,
    {
      provide: 'CustomInterviewQuestionRepository',
      useClass: CustomInterviewQuestionRepositoryImpl,
    },
    // {
    //   provide: 'IInterviewService',
    //   useClass: InterviewsService,
    // },
  ],
  exports: [CustomInterviewQuestionService],
})
export class QuestionModule {}
