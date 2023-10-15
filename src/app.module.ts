import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { DbModule } from './db/db.module';
import { GptChatModule } from './gpt-chat/gpt-chat.module';
import openAiConfig from './config/openAi.config';
import { APP_FILTER, APP_PIPE, HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './http-exception/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import kakaoConfig from '@config/kakao.config';
import { validate } from './env.validation';
import { ShareModule } from './share/share.module';
import { InterviewsModule } from './interviews/interviews.module';
import { QuestionModule } from './question/question.module';
import jwtConfig from '@config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig, openAiConfig, kakaoConfig, jwtConfig],
      validate,
    }),
    DbModule,
    GptChatModule,
    AuthModule,
    ShareModule,
    InterviewsModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: (httpAdapterHost: HttpAdapterHost) => {
        return new AllExceptionsFilter(httpAdapterHost.httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
