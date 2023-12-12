import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviews } from './entities/customInterviews.entity';
import { Repository } from 'typeorm';
import { CustomInterviewInfo } from './model/customInterviews.model';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';

@Injectable()
export class CustomInterviewRepository {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private customInterviewRepository: Repository<CustomInterviews>,
  ) {}

  async saveInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const { userKakaoId, position, skill, time } = customInterviewInfo;
    const interview = this.customInterviewRepository.create({
      userKakaoId,
      position,
      skill,
      time,
    });
    const saveInterview = await this.customInterviewRepository.save(interview);
    return saveInterview;
  }

  async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
    const findAllInterview = await this.customInterviewRepository.find({
      where: {
        userKakaoId: kakaoId,
      },
    });
    return findAllInterview;
  }
}
