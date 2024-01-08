import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomInterviews } from 'src/domain/entities/interview.entity';

import { CustomInterviewRepository } from 'src/domain/repositories/interview/custom-interview.repository';
import { CreateCustomInterviewInfo } from 'src/domain/value-objects/interview/custom-interview.vo';
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

  async findCustomInterview(
    id: number,
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviews> {
    const userId = userKakaoId.getValue();
    const findCustomInterview = await this.customInterviewRepository
      .createQueryBuilder('customInterviews')
      .leftJoinAndSelect('customInterviews.question', 'question')
      .where('customInterviews.id =:id', { id })
      .andWhere('customInterviews.user =:userId', { userId })
      .getOne();

    return findCustomInterview;
  }

  async deleteCustomInterview(id: number, kakaoId: string): Promise<boolean> {
    const deleteCustomInterview = await this.customInterviewRepository
      .createQueryBuilder()
      .delete()
      .where('user =:kakaoId', { kakaoId })
      .andWhere('id =:id', { id })
      .execute();

    if (deleteCustomInterview.affected === 0) {
      throw new HttpException(
        '해당 인터뷰가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
