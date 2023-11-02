import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { interviewInfo } from './model/interviews.model';
import { Repository } from 'typeorm';
import { Interviews } from './entities/interview.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private interviewRepository: Repository<Interviews>,
  ) {}

  async createInterview(
    interviewInfo: interviewInfo,
  ): Promise<CreateInterviewDto> {
    const { userId, position, skill, time } = interviewInfo;
    const interview = this.interviewRepository.create({
      userKakaoId: userId,
      position,
      skill,
      time,
    });
    const findInterview = await this.interviewRepository.save(interview);

    return findInterview;
  }

  async findAll(kakaoId: string): Promise<CreateInterviewDto[]> {
    const findAllInterview = await this.interviewRepository.find({
      where: {
        userKakaoId: kakaoId,
      },
    });
    return findAllInterview;
  }
}
