import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviewInfo } from 'src/domain/interface/interview.interface';
import { CompletSaveQuestion } from 'src/domain/interface/question.interface';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletSaveQuestion[]>;
}
