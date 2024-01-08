import { UrlInterviewQuestion } from 'src/domain/entities/question.entity';
import { UrlContents } from 'src/domain/value-objects/interview/url-interview.vo';
import { SaveUrlQuestionInfo } from 'src/domain/value-objects/question/url-question.vo';
import { EntityManager } from 'typeorm';

export interface UrlInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveUrlQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviewQuestion>;
}
