import { UrlInterviewQuestion } from 'src/domain/entities/question.entity';
import {
  FindQuestion,
  SaveAnswerFeedbackInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { SaveUrlQuestionInfo } from 'src/domain/value-objects/question/url-question.vo';
import { EntityManager } from 'typeorm';

export interface UrlInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveUrlQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviewQuestion>;
  findOneQuestion(findQuestion: FindQuestion): Promise<UrlInterviewQuestion>;
  saveUrlQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean>;
}
