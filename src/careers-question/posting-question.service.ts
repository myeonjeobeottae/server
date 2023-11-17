import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CareersQuestion } from './entities/careers-question.entity';
import { Question } from 'src/question/entities/question.entity';
import {
  FindOneQuestionInfo,
  FindQuestionsIncludedInTheInterviewInfo,
} from 'src/question/model/question.model';
import { SaveQuestionDto } from 'src/question/dto/create-question.dto';

@Injectable()
export class CareersQuestionService {
  constructor(
    @Inject('CAREERS_QUESTION_REPOSITORY')
    private postingQuestionRepository: Repository<CareersQuestion>,
  ) {}
  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const createQuestion = this.postingQuestionRepository.create(questionInfo);

    const saveQuestion = await this.postingQuestionRepository.save(
      createQuestion,
    );
    return saveQuestion;
  }

  async QuestionsIncludedInTheInterview(
    findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo,
  ): Promise<Question[]> {
    const { interviewId, userKakaoId } =
      findQuestionsIncludedInTheInterviewInfo;

    const questionsIncludedInTheInterview =
      await this.postingQuestionRepository.find({
        select: ['id', 'question', 'answer', 'feedback'],
        where: { interviewId: interviewId, userKakaoId: userKakaoId },
      });

    return questionsIncludedInTheInterview;
  }

  async findOneQuestion(
    findOneQuestionInfo: FindOneQuestionInfo,
  ): Promise<Question> {
    const { questionId, userKakaoId } = findOneQuestionInfo;

    const findOneQuestion = await this.postingQuestionRepository.findOne({
      where: { id: questionId, userKakaoId },
      select: ['id', 'question', 'answer', 'feedback'],
    });

    return findOneQuestion;
  }
}
