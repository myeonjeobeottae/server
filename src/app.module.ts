import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { DbModule } from './db/db.module';
import { GptChatModule } from './gpt-chat/gpt-chat.module';
import openAiConfig from './config/openAi.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig, openAiConfig],
    }),

    UserModule,
    DbModule,
    GptChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
