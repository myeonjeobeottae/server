import { Module } from '@nestjs/common';
import { CareersInterviewsService } from './careers-interviews.service';
import { CareersInterviewsController } from './careers-interviews.controller';
import { DbModule } from 'src/db/db.module';
import { CareersInterviewsProvider } from './ceareers-interviews.provider';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';
import { HttpModule } from '@nestjs/axios';
import { CareersQuestionModule } from 'src/careers-question/careers-question.module';

@Module({
  imports: [
    DbModule,
    GptChatModule,
    CareersQuestionModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [CareersInterviewsController],
  providers: [CareersInterviewsService, ...CareersInterviewsProvider],
})
export class CareersInterviewsModule {}
