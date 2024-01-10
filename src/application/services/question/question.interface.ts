import { FindOneQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import {
  CreateFeedbackInfo,
  FindQuestion,
  SaveAnswerFeedbackInfo,
} from 'src/domain/value-objects/question/custom-question.vo';

export interface IQuestionService {
  creatQuestionFeedback(createFeedbackInfo: CreateFeedbackInfo): Promise<any>;
  findOneCustomInterviewQuestion(
    findOneQuestion: FindQuestion,
  ): Promise<FindOneQuestionDto>;
  findOneUrlInterviewQuestion(
    findOneQuestion: FindQuestion,
  ): Promise<FindOneQuestionDto>;
  saveCustomQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean>;
  saveUrlQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean>;
}
