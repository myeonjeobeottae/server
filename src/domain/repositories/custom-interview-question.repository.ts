import { CustomInterviewQuestion } from '../entities/question.entity';
import { EntityManager } from 'typeorm';
import {
  FindQuestion,
  SaveFeedbackInfo,
  SaveQuestionAnswer,
  SaveQuestionInfo,
} from '../value-objects/question.vo';

export interface CustomInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewQuestion>;
  findOneQuestion(findQuestion: FindQuestion): Promise<CustomInterviewQuestion>;
  saveQuestionAnswer(
    saveQuestionAnswerInfo: SaveQuestionAnswer,
  ): Promise<boolean>;
  saveQuestionFeedback(saveFeedbackInfo: SaveFeedbackInfo): Promise<boolean>;
}
