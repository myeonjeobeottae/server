import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';
import { InterviewProvider } from './interview.provider';
import { DbModule } from 'src/db/db.module';
import { QuestionModule } from 'src/question/question.module';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DbModule,
    QuestionModule,
    GptChatModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [InterviewsController],
  providers: [InterviewsService, ...InterviewProvider],
  exports: [InterviewsService],
})
export class InterviewsModule {}
