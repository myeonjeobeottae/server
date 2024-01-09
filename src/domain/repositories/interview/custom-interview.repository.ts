import { EntityManager } from 'typeorm';
import { CustomInterviews } from '../../entities/interview.entity';
import { User } from '../../entities/user.entity';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
  FindOneInterview,
  InterviewInfo,
} from '../../value-objects/interview/custom-interview.vo';
import { UserKakaoId } from '../../value-objects/user.vo';

export interface CustomInterviewRepository {
  createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviews>;
  findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviews[]>;
  findOneCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<CustomInterviews>;
  deleteCustomInterview(findOneInterview: FindOneInterview): Promise<boolean>;
}
