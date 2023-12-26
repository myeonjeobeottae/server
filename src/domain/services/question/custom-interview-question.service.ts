import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CompletSaveQuestion,
  SaveQuestionInfo,
} from 'src/domain/interface/question.interface';

@Injectable()
export class CustomInterviewQuestionService {
  constructor(
    @Inject('CustomInterviewQuestionRepository')
    private readonly customInterviewQuestionRepository: CustomInterviewQuestionRepository,
  ) {}

  async createQuestion(
    saveQuestionInfo: SaveQuestionInfo,
  ): Promise<CompletSaveQuestion[]> {
    // const createQuestion = this.questionRepository.saveQuestion(questionInfo);
    const questionArray = this.questionReplace(saveQuestionInfo.content);

    const saveQuestion = questionArray.map(async (question) => {
      const saveInfo: SaveQuestionInfo = {
        content: question,
        interview: saveQuestionInfo.interview,
      };
      return await this.customInterviewQuestionRepository.saveQuestion(
        saveInfo,
      );
    });
    const completSaveQuestion = await Promise.all(saveQuestion);

    //반환 타입 지정 ,value object 유효성 검사?
    const sortCompletSaveQuestion = completSaveQuestion.sort(
      (a, b) => a.id - b.id,
    );

    return sortCompletSaveQuestion;
  }

  private questionReplace(completContent: string): Array<string> {
    const linesWithoutNumbers = completContent.replace(/^\d+\.\s+/gm, '');
    const questionsArray = linesWithoutNumbers.split('\n');

    return questionsArray;
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

  //   async findOneQuestion(
  //     findOneQuestionInfo: FindOneQuestionInfo,
  //   ): Promise<Question> {
  //     const findOneQuestion = await this.questionRepository.findOneQuestion(
  //       findOneQuestionInfo,
  //     );
  //     if (!findOneQuestion) {
  //       throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
  //     }
  //     return findOneQuestion;
  //   }
}
