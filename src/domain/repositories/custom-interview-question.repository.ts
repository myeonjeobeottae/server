import { CustomInterviewQuestion } from '../entities/question.entity';
import { EntityManager } from 'typeorm';
import { FindQuestion, SaveQuestionInfo } from '../value-objects/question.vo';

export interface CustomInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewQuestion>;
  findOneQuestion(findQuestion: FindQuestion): Promise<any>;
}
