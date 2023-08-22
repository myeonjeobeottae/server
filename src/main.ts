import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { AppModule } from './app.module';
import appConfig from './config/app.config';
import { DbService } from './db/db.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.port;
  const dbService = app.get(DbService);
  await dbService.databaseConnect();
  await app.listen(port);
}
bootstrap();
