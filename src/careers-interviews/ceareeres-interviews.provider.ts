import { DataSource } from 'typeorm';
import { CareeresInterviews } from './entities/careeres-interview.entity';

export const CareeresInterviewsProvider = [
  {
    provide: 'CAREERES_INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareeresInterviews),
    inject: ['DATA_SOURCE'],
  },
];
