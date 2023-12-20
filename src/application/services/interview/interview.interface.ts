import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviewInfo } from 'src/domain/interface/interview.interface';

export interface IInterviewService {
  createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto>;
}
