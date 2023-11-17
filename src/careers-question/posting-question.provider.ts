import { DataSource } from 'typeorm';
import { CareersQuestion } from './entities/careers-question.entity';

export const PostingQuestionProvider = [
  {
    provide: 'CAREERS_QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareersQuestion),
    inject: ['DATA_SOURCE'],
  },
];
