import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CareersInterviews } from './entities/careers-interview.entity';
import { SaveCareersInterviewInfo } from './model/careers-interviews.model';
import { CareersInterviewDto } from './dto/create-careers-interview.dto';

@Injectable()
export class CareersInterviewRepository {
  constructor(
    @Inject('CAREERS_INTERVIEW_REPOSITORY')
    private careersInterviewRepository: Repository<CareersInterviews>,
  ) {}

  async saveInterview(
    saveCareersInterviewInfo: SaveCareersInterviewInfo,
  ): Promise<CareersInterviewDto> {
    const interview = this.careersInterviewRepository.create(
      saveCareersInterviewInfo,
    );
    const saveInterview = await this.careersInterviewRepository.save(interview);
    return saveInterview;
  }

  async findAll(kakaoId: string): Promise<CareersInterviews[]> {
    const findAllInterviews = await this.careersInterviewRepository.find({
      where: { userKakaoId: kakaoId },
    });
    return findAllInterviews;
  }
}
