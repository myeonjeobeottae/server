import { CustomInterviewQuestion } from '../../entities/question.entity';
import { EntityManager } from 'typeorm';
import {
  FindQuestion,
  SaveAnswerFeedbackInfo,
  SaveQuestionAnswer,
  SaveQuestionInfo,
} from '../../value-objects/question/custom-question.vo';

export interface CustomInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewQuestion>;
  findOneQuestion(findQuestion: FindQuestion): Promise<CustomInterviewQuestion>;
  saveQuestionAnswer(
    saveQuestionAnswerInfo: SaveQuestionAnswer,
  ): Promise<boolean>;
  saveCustomQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean>;
}
