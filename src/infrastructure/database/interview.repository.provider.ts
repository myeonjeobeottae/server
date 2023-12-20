import {
  CustomInterviews,
  UrlInterviews,
} from 'src/domain/entities/interview.entity';
import { DataSource } from 'typeorm';

export const CustomInterviewProvider = [
  {
    provide: 'CUSTOM_INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomInterviews),
    inject: ['DATA_SOURCE'],
  },
];

export const UrlInterviewProvider = [
  {
    provide: 'URL_INTERVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlInterviews),
    inject: ['DATA_SOURCE'],
  },
];
