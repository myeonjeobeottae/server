import { CreateCustomInterviewInfo } from '../interface/interview.interface';

export interface CustomInterviewRepository {
  createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
  ): Promise<CreateCustomInterviewInfo>;
}
