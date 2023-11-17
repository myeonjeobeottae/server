import { Module } from '@nestjs/common';
import { CareersQuestionService } from './posting-question.service';
import { CareersQuestionController } from './careers-question.controller';
import { DbModule } from 'src/db/db.module';
import { PostingQuestionProvider } from './posting-question.provider';

@Module({
  imports: [DbModule],
  controllers: [CareersQuestionController],
  providers: [CareersQuestionService, ...PostingQuestionProvider],
  exports: [CareersQuestionService],
})
export class CareeresQuestionModule {}
