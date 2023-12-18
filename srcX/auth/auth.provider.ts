import { DataSource } from 'typeorm';
import { Auth } from './entities/auth.entity';

export const AuthProvider = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Auth),
    inject: ['DATA_SOURCE'],
  },
];
