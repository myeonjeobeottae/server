import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10) || 3000,
}));
