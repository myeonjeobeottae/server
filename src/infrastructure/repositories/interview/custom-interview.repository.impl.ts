import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewDto } from 'src/application/dtos/interviews/custom-interviews.dto';
import { CustomInterviews } from 'src/domain/entities/interview.entity';
import { User } from 'src/domain/entities/user.entity';

import { CustomInterviewRepository } from 'src/domain/repositories/custom-interview.repository';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
  InterviewInfo,
  Position,
  Stack,
  Time,
} from 'src/domain/value-objects/interview.vo';
import { EntityManager, Repository } from 'typeorm';

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
    entityManager?: EntityManager,
  ): Promise<CustomInterviews> {
    const repository =
      entityManager?.getRepository(CustomInterviews) ??
      this.customInterviewRepository;

    const interview = repository.create({
      stack: createCustomInterviewInfo.getStack().getValue(),
      position: createCustomInterviewInfo.getPosition().getValue(),
      time: createCustomInterviewInfo.getTime().getValue(),
      user: createCustomInterviewInfo.getUser().getValue(),
    });
    const saveInterview = await repository.save(interview);

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
