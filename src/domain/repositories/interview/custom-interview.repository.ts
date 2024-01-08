import { EntityManager } from 'typeorm';
import { CustomInterviews } from '../../entities/interview.entity';
import { User } from '../../entities/user.entity';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
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
  findCustomInterview(
    id: number,
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviews>;
  deleteCustomInterview(id: number, kakaoId: string): Promise<boolean>;
}
