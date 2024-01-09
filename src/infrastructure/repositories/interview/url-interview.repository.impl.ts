import { Inject, Injectable } from '@nestjs/common';
import { UrlInterviews } from 'src/domain/entities/interview.entity';
import { UrlInterviewRepository } from 'src/domain/repositories/interview/url-interview.repository';
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
      companyName: saveUrlInterviewInfo.getCompanyName().getCompanyName(),
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
}
