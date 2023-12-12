import { Inject, Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { SaveQuestionDto } from './dto/create-question.dto';
import {
  FindOneQuestionInfo,
  FindQuestionsIncludedInTheInterviewInfo,
} from './model/question.model';

@Injectable()
export class QuestionRepository {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const createQuestion = this.questionRepository.create(questionInfo);

    const saveQuestion = await this.questionRepository.save(createQuestion);
    return saveQuestion;
  }

  async QuestionsIncludedInTheInterview(
    findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo,
  ): Promise<Question[]> {
    const { interviewId, userKakaoId } =
      findQuestionsIncludedInTheInterviewInfo;

    const questionsIncludedInTheInterview = await this.questionRepository.find({
      select: ['id', 'question', 'answer', 'feedback'],
      where: { interviewId: interviewId, userKakaoId: userKakaoId },
    });

    return questionsIncludedInTheInterview;
  }

  async findOneQuestion(
    findOneQuestionInfo: FindOneQuestionInfo,
  ): Promise<Question> {
    const { questionId, userKakaoId } = findOneQuestionInfo;

    const findOneQuestion = await this.questionRepository.findOne({
      where: { id: questionId, userKakaoId },
      select: ['id', 'question', 'answer', 'feedback'],
    });

    return findOneQuestion;
  }
}
