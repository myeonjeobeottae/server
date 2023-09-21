import { Interviews } from './entities/interview.entity';
import { DataSource } from 'typeorm';

export const InterviewProvider = [
  {
    provide: 'INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Interviews),
    inject: ['DATA_SOURCE'],
  },
];
