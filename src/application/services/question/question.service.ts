import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CreateFeedbackInfo,
  CreateQuestionFeedback,
  FindQuestion,
} from 'src/domain/value-objects/question.vo';
import { IQuestionService } from './question.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IOpenAIService } from 'src/domain/contracts/openAI.interface';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject('IOpenAIService')
    private readonly openAIService: IOpenAIService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
  ) {}

  async creatQuestionFeedback(
    createQuestionFeedback: CreateQuestionFeedback,
  ): Promise<any> {
    const findQuestion =
      await this.customInterviewQuestionService.findOneQuestion(
        new FindQuestion(
          createQuestionFeedback.getQuestionId(),
          createQuestionFeedback.getUserKakaoId(),
        ),
      );

    const createFeedback = await this.openAIService.createQuestionFeedback(
      new CreateFeedbackInfo(
        createQuestionFeedback.getQuestion(),
        createQuestionFeedback.getAnswer(),
      ),
    );

    return createFeedback;
  }
}
