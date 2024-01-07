import { CreateQuestionFeedback } from 'src/domain/value-objects/question.vo';

export interface IQuestionService {
  creatQuestionFeedback(
    createQuestionFeedback: CreateQuestionFeedback,
  ): Promise<any>;
}
