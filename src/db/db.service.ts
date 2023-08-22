import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from 'src/config/db.config';
import { DataSource } from 'typeorm';

@Injectable()
export class DbService {
  constructor(
    @Inject(dbConfig.KEY)
    private config: ConfigType<typeof dbConfig>,
  ) {}
  private dataSource: DataSource = new DataSource({
    type: 'mysql',
    host: this.config.host,
    port: this.config.port,
    username: this.config.user,
    password: this.config.password,
    database: this.config.name,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  });

  // databaseConnect() {
  //   const { host, port, name, user, password } = this.config;

  //   const databaseProviders = [
  //     {
  //       provide: 'DATA_SOURCE',
  //       useFactory: async () => {
  //         const dataSource = new DataSource({
  //           type: 'mysql',
  //           host: host,
  //           port: port,
  //           username: user,
  //           password: password,
  //           database: name,
  //           entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //           synchronize: false,
  //         });
  //         await dataSource.initialize();
  //         return dataSource;
  //       },
  //     },
  //   ];

  //   return databaseProviders;
  // }
}
