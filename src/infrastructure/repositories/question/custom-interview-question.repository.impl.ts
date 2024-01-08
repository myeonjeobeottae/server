import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomInterviewQuestion } from 'src/domain/entities/question.entity';

import { CustomInterviewQuestionRepository } from 'src/domain/repositories/question/custom-interview-question.repository';
import {
  FindQuestion,
  SaveFeedbackInfo,
  SaveQuestionAnswer,
} from 'src/domain/value-objects/question/custom-question.vo';
import { SaveQuestionInfo } from 'src/domain/value-objects/question/custom-question.vo';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CustomInterviewQuestionRepositoryImpl
  implements CustomInterviewQuestionRepository
{
  constructor(
    @Inject('CUSTOM_INTERVIEW_QUESTION_REPOSITORY')
    private customInterviewQuestionRepository: Repository<CustomInterviewQuestion>,
  ) {}

  async saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewQuestion> {
    const repository =
      entityManager?.getRepository(CustomInterviewQuestion) ??
      this.customInterviewQuestionRepository;

    const createQuestion = repository.create({
      question: saveQuestionInfo.getquestion().getValue(),
      interview: saveQuestionInfo.getCustomInterviewInstance().getValue(),
    });

    const saveQuestion = await repository.save(createQuestion);

    return saveQuestion;
  }

  async findOneQuestion(
    findQuestion: FindQuestion,
  ): Promise<CustomInterviewQuestion> {
    const questionId = findQuestion.getQuestionId().getValue();
    const userId = findQuestion.getUserKakaoId().getValue();

    const findOneQuestion = await this.customInterviewQuestionRepository
      .createQueryBuilder('customInterviewQuestion')
      .leftJoinAndSelect(
        'customInterviewQuestion.interview',
        'customInterviews',
      )
      .where('customInterviews.user=:userId', { userId })
      .andWhere('customInterviewQuestion.id=:questionId', { questionId })
      .getOne();

    if (!findOneQuestion) {
      throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
    }

    return findOneQuestion;
  }

  async saveQuestionAnswer(
    saveQuestionAnswerInfo: SaveQuestionAnswer,
  ): Promise<boolean> {
    const questionId = saveQuestionAnswerInfo.getQuestionId().getValue();
    const answer = saveQuestionAnswerInfo.getAnswer().getValue();
    const saveQuestionAnswer = await this.customInterviewQuestionRepository
      .createQueryBuilder('')
      .update()
      .set({ answer })
      .where('id=:questionId', { questionId })
      .execute();

    const saveQuestionAnswerResult =
      saveQuestionAnswer.affected === 1 ? true : false;

    if (saveQuestionAnswerResult === false) {
      throw new HttpException(
        '답변이 저장되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return saveQuestionAnswerResult;
  }

  async saveQuestionFeedback(
    saveFeedbackInfo: SaveFeedbackInfo,
  ): Promise<boolean> {
    const questionId = saveFeedbackInfo.getQuestionId().getValue();
    const feedback = saveFeedbackInfo.getFeedback().getValue();
    const saveQuestionFeedback = await this.customInterviewQuestionRepository
      .createQueryBuilder('')
      .update()
      .set({ feedback })
      .where('id=:questionId', { questionId })
      .execute();

    const saveQuestionFeedbackResult =
      saveQuestionFeedback.affected === 1 ? true : false;

    if (saveQuestionFeedbackResult === false) {
      throw new HttpException(
        '피드백이 저장되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return saveQuestionFeedbackResult;
  }
}
