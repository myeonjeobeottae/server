import { Inject, Injectable } from '@nestjs/common';

import {
  CreateCustomInterviewInfo,
  InterviewInfo,
} from 'src/domain/interface/interview.interface';
import { CustomInterviewRepository } from 'src/domain/repositories/custom-interview.repository';

@Injectable()
export class CustomInterviewsService {
  constructor(
    @Inject('CustomInterviewRepository')
    private customInterviewRepository: CustomInterviewRepository,
  ) {}

  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
  ): Promise<InterviewInfo> {
    const saveInterview =
      await this.customInterviewRepository.createCustomInterview(
        createCustomInterviewInfo,
      );
    return saveInterview;
  }

  //   async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
