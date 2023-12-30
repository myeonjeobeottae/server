import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviewQuestion } from '../entities/question.entity';
import { SaveQuestionInfo } from '../value-objects/question.vo';
import { EntityManager } from 'typeorm';

export interface CustomInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewQuestion>;
}
