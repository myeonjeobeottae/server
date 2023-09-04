import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { GptChatController } from './gpt-chat.controller';
import { OpenAiProvider } from './gpt-chat.provider';

@Module({
  controllers: [GptChatController],
  providers: [GptChatService, OpenAiProvider],
})
export class GptChatModule {}
