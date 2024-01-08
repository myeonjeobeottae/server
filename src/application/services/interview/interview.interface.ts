import {
  CreateCustomInterviewDto,
  CustomInterviewDto,
  FindCustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import { CompletQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviewInfo } from 'src/domain/value-objects/interview/custom-interview.vo';
import { UrlInterviewInfo } from 'src/domain/value-objects/interview/url-interview.vo';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletQuestionDto[]>;
  createUrlInterview(urlInterviewInfo: UrlInterviewInfo): Promise<any>;
  findUserCustomInterviews(userKakaoId: string): Promise<CustomInterviewDto[]>;
  findCustomInterview(
    id: number,
    userKakaoId: string,
  ): Promise<FindCustomInterviewDto>;
  deleteCustomInterview(id: number, kakaoId: string): Promise<boolean>;
}
