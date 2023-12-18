import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviews } from './entities/customInterviews.entity';
import { Repository } from 'typeorm';
import {
  CustomInterviewInfo,
  SaveCustomInterviewInfo,
} from './model/customInterviews.model';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';

@Injectable()
export class CustomInterviewRepository {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private customInterviewRepository: Repository<CustomInterviews>,
  ) {}

  async saveInterview(
    saveCustomInterviewInfo: SaveCustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const interview = this.customInterviewRepository.create(
      saveCustomInterviewInfo,
    );
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
