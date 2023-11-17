import { CustomInterviews } from './entities/customInterviews.entity';
import { DataSource } from 'typeorm';

export const InterviewProvider = [
  {
    provide: 'INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomInterviews),
    inject: ['DATA_SOURCE'],
  },
];
