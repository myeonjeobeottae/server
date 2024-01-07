import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import { CreateQuestionFeedback } from 'src/domain/value-objects/question.vo';
import { IQuestionService } from './question.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
  ) {}

  async creatQuestionFeedback(
    createQuestionFeedback: CreateQuestionFeedback,
  ): Promise<any> {
    const createFeedback =
      await this.customInterviewQuestionService.creatQuestionFeedback(
        createQuestionFeedback,
      );

    return createFeedback;
  }
}
