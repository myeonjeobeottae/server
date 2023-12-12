import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProvider } from './question.provider';
import { DbModule } from 'src/db/db.module';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';
import { QuestionRepository } from './question.repository';

@Module({
  imports: [DbModule, GptChatModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, ...QuestionProvider],
  exports: [QuestionService],
})
export class QuestionModule {}
