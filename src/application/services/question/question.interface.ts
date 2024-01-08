import {
  CreateQuestionFeedback,
  SaveFeedbackInfo,
} from 'src/domain/value-objects/question/custom-question.vo';

export interface IQuestionService {
  creatQuestionFeedback(
    createQuestionFeedback: CreateQuestionFeedback,
  ): Promise<any>;
  saveQuestionFeedback(saveFeedbackInfo: SaveFeedbackInfo): Promise<boolean>;
}
