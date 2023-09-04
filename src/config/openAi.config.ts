import { registerAs } from '@nestjs/config';

export default registerAs('openAi', () => ({
  openAiAPIKey: process.env.OPENAI_API_KEY,
  openAiOrganization: process.env.OPENAI_ORGANIZATION,
}));
