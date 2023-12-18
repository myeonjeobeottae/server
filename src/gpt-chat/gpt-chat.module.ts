import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { OpenAiProvider } from './gpt-chat.provider';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';
import { CustomInterviewsModule } from 'src/custom-interviews/custom-interviews.module';

@Module({
  imports: [DbModule, AuthModule, CustomInterviewsModule],
  // controllers: [GptChatController],
  providers: [GptChatService, OpenAiProvider],
  exports: [GptChatService],
})
export class GptChatModule {}
