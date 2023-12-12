import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { SaveQuestionDto } from './dto/create-question.dto';
import {
  FindQuestionsIncludedInTheInterviewInfo,
  FindOneQuestionInfo,
} from './model/question.model';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const createQuestion = this.questionRepository.saveQuestion(questionInfo);

    return createQuestion;
  }

  async QuestionsIncludedInTheInterview(
    findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo,
  ): Promise<Question[]> {
    const questionsIncludedInTheInterview =
      await this.questionRepository.QuestionsIncludedInTheInterview(
        findQuestionsIncludedInTheInterviewInfo,
      );
    return questionsIncludedInTheInterview;
  }

  async findOneQuestion(
    findOneQuestionInfo: FindOneQuestionInfo,
  ): Promise<Question> {
    const findOneQuestion = await this.questionRepository.findOneQuestion(
      findOneQuestionInfo,
    );
    if (!findOneQuestion) {
      throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    return findOneQuestion;
  }
}
