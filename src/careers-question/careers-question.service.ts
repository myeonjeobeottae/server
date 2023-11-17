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
    private careersQuestionRepository: Repository<CareersQuestion>,
  ) {}
  async saveQuestion(questionInfo: SaveQuestionDto): Promise<Question> {
    const createQuestion = this.careersQuestionRepository.create(questionInfo);

    const saveQuestion = await this.careersQuestionRepository.save(
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
      await this.careersQuestionRepository.find({
        select: ['id', 'question', 'answer', 'feedback'],
        where: { interviewId: interviewId, userKakaoId: userKakaoId },
      });

    return questionsIncludedInTheInterview;
  }

  async findOneQuestion(
    findOneQuestionInfo: FindOneQuestionInfo,
  ): Promise<Question> {
    const { questionId, userKakaoId } = findOneQuestionInfo;

    const findOneQuestion = await this.careersQuestionRepository.findOne({
      where: { id: questionId, userKakaoId },
      select: ['id', 'question', 'answer', 'feedback'],
    });

    return findOneQuestion;
  }
}
