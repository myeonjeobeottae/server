import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../src/config/app.config';
import dbConfig from '../src/config/db.config';
import { DbModule } from './db/db.module';
import { GptChatModule } from './gpt-chat/gpt-chat.module';
import openAiConfig from '../src/config/openAi.config';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core';
import { AllExceptionsFilter } from '../src/common/http-exception/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import kakaoConfig from 'src/config/kakao.config';
import { validate } from './env.validation';
import { ShareModule } from './share/share.module';
import { CustomInterviewsModule } from './custom-interviews/custom-interviews.module';
import { QuestionModule } from './question/question.module';
import jwtConfig from 'src/config/jwt.config';
import { CareersQuestionModule } from './careers-question/careers-question.module';
import { CareersInterviewsModule } from './careers-interviews/careers-interviews.module';
import { LoggingInterceptor } from '../src/common/interceptor/logger/logger.interceptor';
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
    CustomInterviewsModule,
    QuestionModule,
    CareersQuestionModule,
    CareersInterviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useFactory: (httpAdapterHost: HttpAdapterHost) => {
        return new AllExceptionsFilter(httpAdapterHost.httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
