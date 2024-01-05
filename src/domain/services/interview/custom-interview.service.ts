import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewRepository } from 'src/domain/repositories/custom-interview.repository';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInstance,
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

  async findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviewInstance[]> {
    const findUserCustomInterviews =
      await this.customInterviewRepository.findUserCustomInterviews(
        userKakaoId,
      );
    const userCustomInterviews = findUserCustomInterviews.map(
      (customInterview) => {
        return new CustomInterviewInstance(customInterview);
      },
    );

    return userCustomInterviews;
  }

  async findCustomInterview(
    id: number,
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviewInstance> {
    const findCustomInterview =
      await this.customInterviewRepository.findCustomInterview(id, userKakaoId);
    const customInterview = new CustomInterviewInstance(findCustomInterview);

    return customInterview;
  }

  async deleteCustomInterview(id: number, kakaoId: string): Promise<boolean> {
    const deleteCustomInterview =
      await this.customInterviewRepository.deleteCustomInterview(id, kakaoId);
    return deleteCustomInterview;
  }

  //   async findAll(kakaoId: string): Promise<CreateCustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
