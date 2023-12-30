import { CustomInterviewDto } from 'src/application/dtos/interviews/custom-interviews.dto';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviewInfo } from 'src/domain/value-objects/interview.vo';
import { CompletSaveQuestion } from 'src/domain/value-objects/question.vo';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletCustomQuestionDto[]>;
}
