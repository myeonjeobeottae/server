import {
  CreateCustomInterviewDto,
  CustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviews } from 'src/domain/entities/interview.entity';
import { CustomInterviewInfo } from 'src/domain/value-objects/interview.vo';
import { CompletSaveQuestion } from 'src/domain/value-objects/question.vo';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletCustomQuestionDto[]>;
  findUserCustomInterviews(userKakaoId: string): Promise<CustomInterviewDto[]>;
  findCustomInterview(
    id: number,
    userKakaoId: string,
  ): Promise<CustomInterviews>;
  deleteCustomInterview(id: number, kakaoId: string): Promise<boolean>;
}
