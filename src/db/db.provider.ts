import { DataSource } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import dbConfig from 'src/config/db.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (config: ConfigType<typeof dbConfig>) => {
      const dataSource = new DataSource({
        type: 'mysql', // This can also be taken from config
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.name,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // This can also be taken from config
      });

      await dataSource.initialize();
      return dataSource;
    },
    inject: [dbConfig.KEY],
  },
];
