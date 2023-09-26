import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { SaveQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const createQuestion = this.questionRepository.create(questionInfo);
    const saveQuestion = await this.questionRepository.save(createQuestion);
    return saveQuestion;
  }
}
