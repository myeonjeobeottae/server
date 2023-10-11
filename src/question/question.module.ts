import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProvider } from './question.provider';
import { ShareModule } from 'src/share/share.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule, ShareModule],
  controllers: [QuestionController],
  providers: [QuestionService, ...QuestionProvider],
  exports: [QuestionService],
})
export class QuestionModule {}
