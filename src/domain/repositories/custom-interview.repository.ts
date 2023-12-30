import { EntityManager } from 'typeorm';
import { CustomInterviews } from '../entities/interview.entity';
import { User } from '../entities/user.entity';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
  InterviewInfo,
} from '../value-objects/interview.vo';

export interface CustomInterviewRepository {
  createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviews>;
}
