import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProvider } from './question.provider';
import { DbModule } from 'src/db/db.module';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';

@Module({
  imports: [DbModule, GptChatModule],
  controllers: [QuestionController],
  providers: [QuestionService, ...QuestionProvider],
  exports: [QuestionService],
})
export class QuestionModule {}
