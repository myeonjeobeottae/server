import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviews } from 'src/domain/entities/interview.entity';
import { User } from 'src/domain/entities/user.entity';

import { CustomInterviewRepository } from 'src/domain/repositories/custom-interview.repository';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInstance,
  InterviewInfo,
} from 'src/domain/value-objects/interview.vo';
import { EntityManager } from 'typeorm';

@Injectable()
export class CustomInterviewsService {
  constructor(
    @Inject('CustomInterviewRepository')
    private customInterviewRepository: CustomInterviewRepository,
  ) {}

  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewInstance> {
    const saveInterview =
      await this.customInterviewRepository.createCustomInterview(
        createCustomInterviewInfo,
        entityManager,
      );
    return new CustomInterviewInstance(saveInterview);
  }

  //   async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
