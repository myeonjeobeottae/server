import { Inject, Injectable } from '@nestjs/common';

import { CreateCustomInterviewInfo } from 'src/domain/interface/interview.interface';
import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviewRepository } from 'src/domain/repositories/customInterview.repository';

@Injectable()
export class CustomInterviewsService {
  constructor(
    @Inject('CustomInterviewRepository')
    private customInterviewRepository: CustomInterviewRepository,
  ) {}

  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
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
