import { Module } from '@nestjs/common';
import { CustomInterviewsService } from './customInterviews.service';
import { CustomInterviewsController } from './customInterviews.controller';
import { InterviewProvider } from './customInterviews.provider';
import { DbModule } from 'src/db/db.module';
import { QuestionModule } from 'src/question/question.module';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';

@Module({
  imports: [DbModule, QuestionModule, GptChatModule],
  controllers: [CustomInterviewsController],
  providers: [CustomInterviewsService, ...InterviewProvider],
  exports: [CustomInterviewsService],
})
export class CustomInterviewsModule {}
