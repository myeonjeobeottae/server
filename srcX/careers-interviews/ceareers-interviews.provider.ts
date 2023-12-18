import { DataSource } from 'typeorm';
import { CareersInterviews } from './entities/careers-interview.entity';

export const CareersInterviewsProvider = [
  {
    provide: 'CAREERS_INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareersInterviews),
    inject: ['DATA_SOURCE'],
  },
];
