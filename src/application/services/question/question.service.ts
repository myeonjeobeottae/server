import { UrlInterviewQuestionService } from 'src/domain/services/question/url-interview-question.service';
import {
  FindQuestion,
  SaveAnswerFeedbackInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { CreateFeedbackInfo } from '../../../domain/value-objects/question/custom-question.vo';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import { IQuestionService } from './question.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IOpenAIService } from 'src/domain/contracts/openAI.interface';
import { FindOneQuestionDto } from 'src/application/dtos/question/question.dto';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
    private readonly urlInterviewQuestionService: UrlInterviewQuestionService,
    @Inject('IOpenAIService')
    private readonly openAIService: IOpenAIService,
  ) {}

  async creatQuestionFeedback(
    createFeedbackInfo: CreateFeedbackInfo,
  ): Promise<any> {
    const createFeedback = await this.openAIService.createQuestionFeedback(
      createFeedbackInfo,
    );

    return createFeedback;
  }

  async findOneCustomInterviewQuestion(
    findOneQuestion: FindQuestion,
  ): Promise<FindOneQuestionDto> {
    const findOneCustomInterviewQuestion =
      await this.customInterviewQuestionService.findOneQuestion(
        findOneQuestion,
      );

    const findQuestion: FindOneQuestionDto = {
      id: findOneCustomInterviewQuestion.getQuestionId().getValue(),
      question: findOneCustomInterviewQuestion.getQuestion().getValue(),
      answer: findOneCustomInterviewQuestion.getAnswer().getValue(),
      feedback: findOneCustomInterviewQuestion.getFeedback().getValue(),
      interviewId: findOneCustomInterviewQuestion.getInterviewId().getValue(),
    };

    return findQuestion;
  }

  async findOneUrlInterviewQuestion(
    findOneQuestion: FindQuestion,
  ): Promise<FindOneQuestionDto> {
    const findOneUrlInterviewQuestion =
      await this.urlInterviewQuestionService.findOneQuestion(findOneQuestion);

    const findQuestion: FindOneQuestionDto = {
      id: findOneUrlInterviewQuestion.getQuestionId().getValue(),
      question: findOneUrlInterviewQuestion.getQuestion().getValue(),
      answer: findOneUrlInterviewQuestion.getAnswer().getValue(),
      feedback: findOneUrlInterviewQuestion.getFeedback().getValue(),
      interviewId: findOneUrlInterviewQuestion.getInterviewId().getValue(),
    };

    return findQuestion;
  }

  async saveCustomQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean> {
    const saveQuestionFeedback =
      await this.customInterviewQuestionService.saveCustomQuestionAnswerFeedback(
        saveAnswerFeedbackInfo,
      );
    return saveQuestionFeedback;
  }

  async saveUrlQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean> {
    const saveQuestionFeedback =
      await this.urlInterviewQuestionService.saveUrlQuestionAnswerFeedback(
        saveAnswerFeedbackInfo,
      );
    return saveQuestionFeedback;
  }
}
