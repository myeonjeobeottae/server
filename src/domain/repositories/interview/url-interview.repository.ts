import { EntityManager } from 'typeorm';
import { SaveUrlInterviewInfo } from '../../value-objects/interview/url-interview.vo';
import { UrlInterviews } from '../../entities/interview.entity';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { FindOneInterview } from 'src/domain/value-objects/interview/custom-interview.vo';

export interface UrlInterviewRepository {
  createUrlInterview(
    saveUrlInterviewInfo: SaveUrlInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviews>;
  findUserUrlInterviews(userKakaoId: UserKakaoId): Promise<UrlInterviews[]>;
  findOneUrlomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<UrlInterviews>;
  deleteUrlInterview(findOneInterview: FindOneInterview): Promise<boolean>;
}
