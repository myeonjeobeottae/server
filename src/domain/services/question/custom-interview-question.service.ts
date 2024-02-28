import {
  FindOneInterviewQuestion,
  OpenAIQuestion,
  SaveAnswerFeedbackInfo,
  SaveQuestionAnswer,
} from '../../value-objects/question/custom-question.vo';
import { CustomInterviewQuestionRepository } from 'src/domain/repositories/question/custom-interview-question.repository';
import { Inject, Injectable } from '@nestjs/common';

import { CompletQuestionDto } from 'src/application/dtos/question/question.dto';
import { EntityManager } from 'typeorm';
import {
  Answer,
  CreateCustomInterviewQuestionInfo,
  CreateFeedbackInfo,
  Feedback,
  FindQuestion,
  Question,
  QuestionId,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { IOpenAIService } from 'src/domain/contracts/openAI.interface';
import { InterviewId } from 'src/domain/value-objects/interview/custom-interview.vo';

@Injectable()
export class CustomInterviewQuestionService {
  constructor(
    @Inject('CustomInterviewQuestionRepository')
    private readonly customInterviewQuestionRepository: CustomInterviewQuestionRepository,
    @Inject('IOpenAIService')
    private readonly openAIService: IOpenAIService,
  ) {}

  async createQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CompletQuestionDto[]> {
    const createQuestion =
      await this.openAIService.createCustomInterviewQuestion(
        createCustomInterviewQuestionInfo,
      );

    const saveQuestion = this.saveQuestion(
      new SaveQuestionInfo(
        createQuestion,
        createCustomInterviewQuestionInfo.getCustomInterviewInstance(),
      ),
      entityManager,
    );

    return saveQuestion;
  }

  async saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CompletQuestionDto[]> {
    const questionArray = OpenAIQuestion.questionReplace(
      saveQuestionInfo.getquestion().getValue(),
    );

    const customInterviewInstance =
      saveQuestionInfo.getCustomInterviewInstance();

    const saveQuestion = questionArray.getValue().map(async (question) => {
      const saveInfo = new SaveQuestionInfo(
        new Question(question),
        customInterviewInstance,
      );

      const completSave =
        await this.customInterviewQuestionRepository.saveQuestion(
          saveInfo,
          entityManager,
        );

      const CompletCustomQuestion: CompletQuestionDto = {
        id: completSave.id,
        question: completSave.question,
        interviewId: completSave.interview.id,
      };

      return CompletCustomQuestion;
    });

    const completSaveQuestion = await Promise.all(saveQuestion);

    const sortCompletSaveQuestion = completSaveQuestion.sort(
      (a, b) => a.id - b.id,
    );

    return sortCompletSaveQuestion;
  }

  async findOneQuestion(
    findQuestion: FindQuestion,
  ): Promise<FindOneInterviewQuestion> {
    const findOneQuestion =
      await this.customInterviewQuestionRepository.findOneQuestion(
        findQuestion,
      );

    const findOneInterviewQuestion = new FindOneInterviewQuestion(
      new QuestionId(findOneQuestion.id),
      new Question(findOneQuestion.question),
      new Answer(findOneQuestion.answer),
      new Feedback(findOneQuestion.feedback),
      new InterviewId(findOneQuestion.interview.id),
    );

    return findOneInterviewQuestion;
  }

  async saveCustomQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean> {
    const saveQuestionFeedback =
      await this.customInterviewQuestionRepository.saveCustomQuestionAnswerFeedback(
        saveAnswerFeedbackInfo,
      );
    return saveQuestionFeedback;
  }
}
