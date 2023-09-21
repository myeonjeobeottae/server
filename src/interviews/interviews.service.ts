import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { interviewInfo } from './interface/interviews.interface';
import { Repository } from 'typeorm';
import { Interviews } from './entities/interview.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private interviewRepository: Repository<Interviews>,
  ) {}

  async createInterview(userId: string): Promise<CreateInterviewDto> {
    const interview = this.interviewRepository.create({
      userKakaoId: userId,
    });
    await this.interviewRepository.save(interview);

    return interview;
  }

  async findAll(kakaoId: string) {
    const findAllInterview = await this.interviewRepository.find({
      where: {
        userKakaoId: kakaoId,
      },
    });
    return findAllInterview;
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
