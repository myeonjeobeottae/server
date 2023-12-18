import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/infrastructure/database/mysql.database';
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
