import {
  CustomInterviewQuestion,
  UrlInterviewQuestion,
} from 'src/domain/entities/question.entity';
import { DataSource } from 'typeorm';

export const CustomInterviewQuestionProvider = [
  {
    provide: 'CUSTOM_INTERVIEW_QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomInterviewQuestion),
    inject: ['DATA_SOURCE'],
  },
];

export const UrlInterviewQuestionProvider = [
  {
    provide: 'URL_INTERVIEW_QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UrlInterviewQuestion),
    inject: ['DATA_SOURCE'],
  },
];
