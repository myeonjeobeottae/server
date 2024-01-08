import { EntityManager } from 'typeorm';
import { SaveUrlInterviewInfo } from '../../value-objects/interview/url-interview.vo';
import { UrlInterviews } from '../../entities/interview.entity';

export interface UrlInterviewRepository {
  createUrlInterview(
    saveUrlInterviewInfo: SaveUrlInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviews>;
}
