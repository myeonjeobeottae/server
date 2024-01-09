import {
  CustomInterviewDto,
  FindCustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import { UrlinterviewDto } from 'src/application/dtos/interviews/url-interviews.dto';
import { CompletQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import {
  CustomInterviewInfo,
  FindOneCustomInterview,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import { UrlInterviewInfo } from 'src/domain/value-objects/interview/url-interview.vo';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletQuestionDto[]>;
  createUrlInterview(urlInterviewInfo: UrlInterviewInfo): Promise<any>;
  findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviewDto[]>;
  findUserUrlInterviews(userKakaoId: UserKakaoId): Promise<UrlinterviewDto[]>;
  findOneCustomInterview(
    findOneCustomInterview: FindOneCustomInterview,
  ): Promise<FindCustomInterviewDto>;
  deleteCustomInterview(
    findOneCustomInterview: FindOneCustomInterview,
  ): Promise<boolean>;
}
