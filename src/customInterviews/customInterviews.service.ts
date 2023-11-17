import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';
import { CustomInterviewInfo } from './model/customInterviews.model';
import { Repository } from 'typeorm';
import { CustomInterviews } from './entities/customInterviews.entity';
import { CreateQuestionDto } from 'src/gpt-chat/dto/create-gpt-chat.dto';
import Cheerio from 'cheerio';

@Injectable()
export class CustomInterviewsService {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private interviewRepository: Repository<CustomInterviews>,
  ) {}

  async saveInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const { userKakaoId, position, skill, time } = customInterviewInfo;
    const interview = this.interviewRepository.create({
      userKakaoId,
      position,
      skill,
      time,
    });
    const saveInterview = await this.interviewRepository.save(interview);
    return saveInterview;
  }

  async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
    const findAllInterview = await this.interviewRepository.find({
      where: {
        userKakaoId: kakaoId,
      },
    });
    return findAllInterview;
  }
}
