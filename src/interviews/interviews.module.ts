import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';
import { InterviewProvider } from './interview.provider';
import { DbModule } from 'src/db/db.module';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [DbModule, ShareModule],
  controllers: [InterviewsController],
  providers: [InterviewsService, ...InterviewProvider],
  exports: [InterviewsService],
})
export class InterviewsModule {}
