import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { OpenAiProvider } from './gpt-chat.provider';
import { DbModule } from 'srcX/db/db.module';
import { AuthModule } from 'srcX/auth/auth.module';
import { CustomInterviewsModule } from 'srcX/custom-interviews/custom-interviews.module';

@Module({
  imports: [DbModule, AuthModule, CustomInterviewsModule],
  // controllers: [GptChatController],
  providers: [GptChatService, OpenAiProvider],
  exports: [GptChatService],
})
export class GptChatModule {}
