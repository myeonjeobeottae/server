import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviews } from 'src/domain/entities/interview.entity';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
} from 'src/domain/interface/interview.interface';
import { CustomInterviewRepository } from 'src/domain/repositories/customInterview.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CustomInterviewRepositoryImpl
  implements CustomInterviewRepository
{
  constructor(
    @Inject('CUSTOM_INTERVIEW_REPOSITORY')
    private customInterviewRepository: Repository<CustomInterviews>,
  ) {}

  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
  ): Promise<CreateCustomInterviewInfo> {
    const interview = this.customInterviewRepository.create(
      createCustomInterviewInfo,
    );
    const saveInterview = await this.customInterviewRepository.save(interview);
    return saveInterview;
  }

  //   async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.find({
  //       where: {
  //         userKakaoId: kakaoId,
  //       },
  //     });
  //     return findAllInterview;
  //   }
}
