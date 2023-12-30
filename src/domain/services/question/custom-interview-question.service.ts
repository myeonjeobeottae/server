import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  Question,
  CompletSaveQuestion,
  InterviewId,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';

@Injectable()
export class CustomInterviewQuestionService {
  constructor(
    @Inject('CustomInterviewQuestionRepository')
    private readonly customInterviewQuestionRepository: CustomInterviewQuestionRepository,
  ) {}

  async createQuestion(
    saveQuestionInfo: SaveQuestionInfo,
  ): Promise<CompletCustomQuestionDto[]> {
    const questionArray = this.questionReplace(
      saveQuestionInfo.getquestion().getValue(),
    );

    const customInterviewInstance =
      saveQuestionInfo.getCustomInterviewInstance();

    const saveQuestion = questionArray.map(async (question) => {
      const saveInfo = new SaveQuestionInfo(
        new Question(question),
        customInterviewInstance,
      );

      const completSave =
        await this.customInterviewQuestionRepository.saveQuestion(saveInfo);

      const CompletCustomQuestion: CompletCustomQuestionDto = {
        id: completSave.id,
        question: completSave.question,
        interviewId: completSave.interview.id,
      };
      return CompletCustomQuestion;
    });

    const completSaveQuestion = await Promise.all(saveQuestion);
    //반환 타입 지정 ,value object 유효성 검사?
    const sortCompletSaveQuestion = completSaveQuestion.sort(
      (a, b) => a.id - b.id,
    );

    return sortCompletSaveQuestion;
  }

  private questionReplace(question: string): Array<string> {
    const linesWithoutNumbers = question.replace(/^\d+\.\s+/gm, '');
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
