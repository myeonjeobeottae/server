import { Module } from '@nestjs/common';
import { CareersQuestionService } from './careers-question.service';
import { CareersQuestionController } from './careers-question.controller';
import { DbModule } from 'src/db/db.module';
import { PostingQuestionProvider } from './careers-question.provider';
import { CareersQuestionRepository } from './careers-question.repository';

@Module({
  imports: [DbModule],
  controllers: [CareersQuestionController],
  providers: [
    CareersQuestionService,
    CareersQuestionRepository,
    ...PostingQuestionProvider,
  ],
  exports: [CareersQuestionService],
})
export class CareersQuestionModule {}
