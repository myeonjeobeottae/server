import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { JwtModule } from './jwt.module';
import { CustomInterviewQuestionRepositoryImpl } from 'src/infrastructure/repositories/question/custom-interview-question.repository.impl';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CustomInterviewQuestionProvider,
  UrlInterviewQuestionProvider,
} from 'src/infrastructure/database/question.repository.provider';
import { QuestionController } from 'src/adapters/controllers/question.controller';
import { OpenAIModule } from './openAI.module';
import { QuestionService } from 'src/application/services/question/question.service';
import { UrlInterviewQuestionRepositoryImpl } from 'src/infrastructure/repositories/question/url-interview-question.repository.impl';
import { UrlInterviewQuestionService } from 'src/domain/services/question/url-interview-question.service';

@Module({
  imports: [DatabaseModule, JwtModule, OpenAIModule],
  controllers: [QuestionController],
  providers: [
    ...CustomInterviewQuestionProvider,
    ...UrlInterviewQuestionProvider,
    CustomInterviewQuestionService,
    UrlInterviewQuestionService,
    {
      provide: 'CustomInterviewQuestionRepository',
      useClass: CustomInterviewQuestionRepositoryImpl,
    },
    {
      provide: 'UrlInterviewQuestionRepository',
      useClass: UrlInterviewQuestionRepositoryImpl,
    },
    {
      provide: 'IQuestionService',
      useClass: QuestionService,
    },
  ],
  exports: [CustomInterviewQuestionService, UrlInterviewQuestionService],
})
export class QuestionModule {}
