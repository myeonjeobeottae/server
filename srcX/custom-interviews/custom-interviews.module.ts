import { Module } from '@nestjs/common';
import { CustomInterviewsService } from './custom-interviews.service';
import { CustomInterviewsController } from './custom-interviews.controller';
import { InterviewProvider } from './custom-interviews.provider';
import { DbModule } from 'srcX/db/db.module';
import { QuestionModule } from 'srcX/question/question.module';
import { GptChatModule } from 'srcX/gpt-chat/gpt-chat.module';
import { CustomInterviewRepository } from './custom-interview.repository';
import { AuthModule } from 'srcX/auth/auth.module';

@Module({
  imports: [DbModule, QuestionModule, GptChatModule, AuthModule],
  controllers: [CustomInterviewsController],
  providers: [
    CustomInterviewsService,
    CustomInterviewRepository,
    ...InterviewProvider,
  ],
  exports: [CustomInterviewsService, CustomInterviewRepository],
})
export class CustomInterviewsModule {}
