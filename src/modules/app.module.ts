import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core';
import kakaoConfig from 'src/config/kakao.config';
import jwtConfig from 'src/config/jwt.config';
import { LoggingInterceptor } from 'src/common/interceptor/logger/logger.interceptor';
import { AllExceptionsFilter } from 'src/common/http-exception/http-exception.filter';
import { DatabaseModule } from './database.module';
import appConfig from 'src/config/app.config';
import dbConfig from 'src/config/db.config';
import openAiConfig from 'src/config/openAi.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig, openAiConfig, kakaoConfig, jwtConfig],
      //   validate,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
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
