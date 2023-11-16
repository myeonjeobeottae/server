import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { OpenAiProvider } from './gpt-chat.provider';
import { DbModule } from 'src/db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DbModule],
  // controllers: [GptChatController],
  providers: [GptChatService, OpenAiProvider],
  exports: [GptChatService],
})
export class GptChatModule {}
