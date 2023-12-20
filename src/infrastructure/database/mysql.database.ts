import { DataSource } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import dbConfig from 'src/config/db.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (config: ConfigType<typeof dbConfig>) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.name,
        entities: [__dirname + '/../../domain/entities/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      });
      try {
        await dataSource.initialize();
        console.log('Database connection successful');
      } catch (error) {
        console.error('Database connection error:', error);
      }

      return dataSource;
    },
    inject: [dbConfig.KEY],
  },
];
