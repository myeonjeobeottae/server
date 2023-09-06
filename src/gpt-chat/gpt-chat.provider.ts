import { Provider } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigType } from '@nestjs/config';
import openAiConfig from '../config/openAi.config';

export const OpenAiProvider: Provider = {
  provide: 'OpenAi', // Provide an identifier for the provider
  inject: [openAiConfig.KEY],
  useFactory: (config: ConfigType<typeof openAiConfig>) => {
    return new OpenAI({
      apiKey: config.openAiAPIKey,
      organization: config.openAiOrganization,
    });
  },
};
