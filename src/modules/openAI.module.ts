import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiProvider } from 'src/infrastructure/external-services/openAI/openAI.provider';
import { OpenAIService } from 'src/infrastructure/external-services/openAI/openAI.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [
    OpenAiProvider,
    {
      provide: 'IOpenAIService',
      useClass: OpenAIService,
    },
  ],
  exports: ['IOpenAIService'],
})
export class OpenAIModule {}
