import { SaveQuestionAnswer } from './../../value-objects/question.vo';
import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { EntityManager } from 'typeorm';
import {
  Answer,
  CreateCustomInterviewQuestionInfo,
  CreateFeedbackInfo,
  CreateQuestionFeedback,
  Feedback,
  FindOneCustomInterviewQuestion,
  FindQuestion,
  Question,
  QuestionId,
  QuestionReplace,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';
import { IOpenAIService } from 'src/domain/contracts/openAI.interface';
import { InterviewId } from 'src/domain/value-objects/interview.vo';

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
  ): Promise<Question> {
    const createQuestion =
      await this.openAIService.createCustomInterviewQuestion(
        createCustomInterviewQuestionInfo,
      );

    return createQuestion;
  }

  async SaveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CompletCustomQuestionDto[]> {
    const questionArray = this.questionReplace(
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

      const CompletCustomQuestion: CompletCustomQuestionDto = {
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

  private questionReplace(question: string): QuestionReplace {
    const linesWithoutNumbers = question.replace(/^\d+\.\s+/gm, '');
    const questionsArray = linesWithoutNumbers.split('\n');

    return new QuestionReplace(questionsArray);
  }

  //   async QuestionsIncludedInTheInterview(
  //     findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo,
  //   ): Promise<Question[]> {
  //     const questionsIncludedInTheInterview =
  //       await this.questionRepository.QuestionsIncludedInTheInterview(
  //         findQuestionsIncludedInTheInterviewInfo,
  //       );
  //     return questionsIncludedInTheInterview;
  //   }

  async findOneQuestion(
    findQuestion: FindQuestion,
  ): Promise<FindOneCustomInterviewQuestion> {
    const findOneQuestion =
      await this.customInterviewQuestionRepository.findOneQuestion(
        findQuestion,
      );

    const findOneCustomInterviewQuestion = new FindOneCustomInterviewQuestion(
      new QuestionId(findOneQuestion.id),
      new Question(findOneQuestion.question),
      new Answer(findOneQuestion.answer),
      new Feedback(findOneQuestion.feedback),
      new InterviewId(findOneQuestion.interview.id),
    );

    return findOneCustomInterviewQuestion;
  }

  async creatQuestionFeedback(
    createQuestionFeedback: CreateQuestionFeedback,
  ): Promise<string> {
    const findQuestion = await this.findOneQuestion(
      new FindQuestion(
        createQuestionFeedback.getQuestionId(),
        createQuestionFeedback.getUserKakaoId(),
      ),
    );

    const questionEquals = findQuestion
      .getQuestion()
      .equals(createQuestionFeedback.getQuestion());

    if (questionEquals === false) {
      throw new Error('문제가 일치 하지 않습니다.');
    }

    await this.saveQuestionAnswer(
      new SaveQuestionAnswer(
        findQuestion.getQuestionId(),
        createQuestionFeedback.getAnswer(),
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

  async saveQuestionAnswer(
    saveQuestionAnswerInfo: SaveQuestionAnswer,
  ): Promise<boolean> {
    return this.customInterviewQuestionRepository.saveQuestionAnswer(
      saveQuestionAnswerInfo,
    );
  }
}
