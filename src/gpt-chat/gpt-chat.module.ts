import { InterviewsModule } from './../interviews/interviews.module';
import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { GptChatController } from './gpt-chat.controller';
import { OpenAiProvider } from './gpt-chat.provider';
import { ShareModule } from 'src/share/share.module';
import { DbModule } from 'src/db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ShareModule,
    DbModule,
    InterviewsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [GptChatController],
  providers: [GptChatService, OpenAiProvider],
})
export class GptChatModule {}
