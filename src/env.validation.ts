import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from '@nestjs/class-validator';
import { plainToInstance } from 'class-transformer';

enum Enviroment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnviromentVariables {
  @IsEnum(Enviroment)
  NODE_ENV: Enviroment;

  @IsNumber()
  PORT: number;

  @IsString()
  HOST: string;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_TYPE: string;

  @IsString()
  OPENAI_API_KEY: string;

  @IsString()
  OPENAI_ORGANIZATION: string;

  @IsString()
  KAKAO_CLIENT_ID: string;

  @IsString()
  KAKAO_REDIRECTURL: string;

  @IsString()
  JWT_SECRET_KEY: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnviromentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
