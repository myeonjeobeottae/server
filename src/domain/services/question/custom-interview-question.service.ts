import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { EntityManager } from 'typeorm';
import {
  FindQuestion,
  Question,
  QuestionReplace,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';

@Injectable()
export class CustomInterviewQuestionService {
  constructor(
    @Inject('CustomInterviewQuestionRepository')
    private readonly customInterviewQuestionRepository: CustomInterviewQuestionRepository,
  ) {}

  async createQuestion(
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

  async findOneQuestion(findQuestion: FindQuestion): Promise<any> {
    const findOneQuestion =
      await this.customInterviewQuestionRepository.findOneQuestion(
        findQuestion,
      );

    return findOneQuestion;
  }
}
