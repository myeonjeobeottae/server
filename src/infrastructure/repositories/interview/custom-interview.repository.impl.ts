import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomInterviews } from 'src/domain/entities/interview.entity';

import { CustomInterviewRepository } from 'src/domain/repositories/interview/custom-interview.repository';
import {
  CreateCustomInterviewInfo,
  FindOneInterview,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
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

  async findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviews[]> {
    const userId = userKakaoId.getValue();
    const findUserCustomInterviews = this.customInterviewRepository
      .createQueryBuilder()
      .where('user =:userId', { userId })
      .getMany();
    return findUserCustomInterviews;
  }

  async findOneCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<CustomInterviews> {
    const interviewId = findOneInterview.getInterviewId().getValue();
    const userId = findOneInterview.getUserKakaoId().getValue();
    const findCustomInterview = await this.customInterviewRepository
      .createQueryBuilder('customInterviews')
      .leftJoinAndSelect('customInterviews.question', 'question')
      .where('customInterviews.id =:interviewId', { interviewId })
      .andWhere('customInterviews.user =:userId', { userId })
      .getOne();

    return findCustomInterview;
  }

  async deleteCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const interviewId = findOneInterview.getInterviewId().getValue();
    const userId = findOneInterview.getUserKakaoId().getValue();

    const deleteCustomInterview = await this.customInterviewRepository
      .createQueryBuilder()
      .delete()
      .where('user =:userId', { userId })
      .andWhere('id =:interviewId', { interviewId })
      .execute();

    const deleteCustomInterviewResult =
      deleteCustomInterview.affected === 1 ? true : false;

    if (deleteCustomInterviewResult === false) {
      throw new HttpException(
        '해당 인터뷰가 삭제 되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return deleteCustomInterviewResult;
  }
}
