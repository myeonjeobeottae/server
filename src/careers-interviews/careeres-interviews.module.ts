import { Module } from '@nestjs/common';
import { CareeresInterviewsService } from './careeres-interviews.service';
import { CareeresInterviewsController } from './careeres-interviews.controller';
import { DbModule } from 'src/db/db.module';
import { CareeresInterviewsProvider } from './ceareeres-interviews.provider';
import { GptChatModule } from 'src/gpt-chat/gpt-chat.module';
import { HttpModule } from '@nestjs/axios';
import { CareeresQuestionModule } from 'src/careers-question/careers-question.module';

@Module({
  imports: [
    DbModule,
    GptChatModule,
    CareeresQuestionModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [CareeresInterviewsController],
  providers: [CareeresInterviewsService, ...CareeresInterviewsProvider],
})
export class CareeresInterviewsModule {}
