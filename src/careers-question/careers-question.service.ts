import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from 'src/question/entities/question.entity';
import {
  FindOneQuestionInfo,
  FindQuestionsIncludedInTheInterviewInfo,
} from 'src/question/model/question.model';
import { SaveQuestionDto } from 'src/question/dto/create-question.dto';
import { CareersQuestionRepository } from './careers-question.repository';

@Injectable()
export class CareersQuestionService {
  constructor(private careersQuestionRepository: CareersQuestionRepository) {}
  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const saveQuestion = await this.careersQuestionRepository.saveQuestion(
      questionInfo,
    );
    return saveQuestion;
  }

  async QuestionsIncludedInTheInterview(
    findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo,
  ): Promise<Question[]> {
    const questionsIncludedInTheInterview =
      await this.careersQuestionRepository.QuestionsIncludedInTheInterview(
        findQuestionsIncludedInTheInterviewInfo,
      );

    return questionsIncludedInTheInterview;
  }

  async findOneQuestion(
    findOneQuestionInfo: FindOneQuestionInfo,
  ): Promise<Question> {
    const findOneQuestion =
      await this.careersQuestionRepository.findOneQuestion(findOneQuestionInfo);

    if (!findOneQuestion) {
      throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    return findOneQuestion;
  }
}
