import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UrlInterviews } from 'src/domain/entities/interview.entity';
import { UrlInterviewRepository } from 'src/domain/repositories/interview/url-interview.repository';
import { FindOneInterview } from 'src/domain/value-objects/interview/custom-interview.vo';
import { SaveUrlInterviewInfo } from 'src/domain/value-objects/interview/url-interview.vo';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UrlInterviewRepositoryImpl implements UrlInterviewRepository {
  constructor(
    @Inject('URL_INTERVIEW_REPOSITORY')
    private urlInterviewRepository: Repository<UrlInterviews>,
  ) {}

  async createUrlInterview(
    saveUrlInterviewInfo: SaveUrlInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviews> {
    const repository =
      entityManager?.getRepository(UrlInterviews) ??
      this.urlInterviewRepository;

    const urlInterview = repository.create({
      companyName: saveUrlInterviewInfo.getCompanyName().getValue(),
      urlContents: saveUrlInterviewInfo.getUrlContent().getValue(),
      URL: saveUrlInterviewInfo.getUrlValue().getValue(),
      time: saveUrlInterviewInfo.getTime().getValue(),
      user: saveUrlInterviewInfo.getUser().getValue(),
    });

    const saveUrlInterview = await repository.save(urlInterview);

    return saveUrlInterview;
  }

  async findUserUrlInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<UrlInterviews[]> {
    const userId = userKakaoId.getValue();
    const findUserCustomInterviews = this.urlInterviewRepository
      .createQueryBuilder()
      .where('user =:userId', { userId })
      .getMany();

    return findUserCustomInterviews;
  }

  async findOneUrlomInterview(
    FindOneInterview: FindOneInterview,
  ): Promise<UrlInterviews> {
    const interviewId = FindOneInterview.getInterviewId().getValue();
    const userId = FindOneInterview.getUserKakaoId().getValue();

    const findUrlInterview = await this.urlInterviewRepository
      .createQueryBuilder('customInterviews')
      .leftJoinAndSelect('customInterviews.question', 'question')
      .where('customInterviews.id =:interviewId', { interviewId })
      .andWhere('customInterviews.user =:userId', { userId })
      .getOne();

    return findUrlInterview;
  }

  async deleteUrlInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const interviewId = findOneInterview.getInterviewId().getValue();
    const userId = findOneInterview.getUserKakaoId().getValue();

    const deleteUrlInterview = await this.urlInterviewRepository
      .createQueryBuilder()
      .delete()
      .where('user =:userId', { userId })
      .andWhere('id =:interviewId', { interviewId })
      .execute();

    const deleteUrlInterviewResult =
      deleteUrlInterview.affected === 1 ? true : false;

    if (deleteUrlInterviewResult === false) {
      throw new HttpException(
        '해당 인터뷰가 삭제 되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return deleteUrlInterviewResult;
  }
}
