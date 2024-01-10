import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UrlInterviewQuestion } from 'src/domain/entities/question.entity';
import { UrlInterviewQuestionRepository } from 'src/domain/repositories/question/url-interview-question.repository';
import {
  FindQuestion,
  SaveAnswerFeedbackInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { SaveUrlQuestionInfo } from 'src/domain/value-objects/question/url-question.vo';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UrlInterviewQuestionRepositoryImpl
  implements UrlInterviewQuestionRepository
{
  constructor(
    @Inject('URL_INTERVIEW_QUESTION_REPOSITORY')
    private urlInterviewQuestionRepository: Repository<UrlInterviewQuestion>,
  ) {}

  async saveQuestion(
    saveQuestionInfo: SaveUrlQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviewQuestion> {
    const repository =
      entityManager?.getRepository(UrlInterviewQuestion) ??
      this.urlInterviewQuestionRepository;

    const createQuestion = repository.create({
      question: saveQuestionInfo.getquestion().getValue(),
      interview: saveQuestionInfo.getCustomInterviewInstance().getValue(),
    });

    const saveQuestion = await repository.save(createQuestion);

    return saveQuestion;
  }

  async findOneQuestion(
    findQuestion: FindQuestion,
  ): Promise<UrlInterviewQuestion> {
    const questionId = findQuestion.getQuestionId().getValue();
    const userId = findQuestion.getUserKakaoId().getValue();

    const findOneQuestion = await this.urlInterviewQuestionRepository
      .createQueryBuilder('urlInterviewQuestion')
      .leftJoinAndSelect('urlInterviewQuestion.interview', 'urlInterviews')
      .where('urlInterviews.user=:userId', { userId })
      .andWhere('urlInterviewQuestion.id=:questionId', { questionId })
      .getOne();

    if (!findOneQuestion) {
      throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
    }

    return findOneQuestion;
  }

  async saveUrlQuestionAnswerFeedback(
    saveAnswerFeedbackInfo: SaveAnswerFeedbackInfo,
  ): Promise<boolean> {
    const questionId = saveAnswerFeedbackInfo.getQuestionId().getValue();
    const answer = saveAnswerFeedbackInfo.getAnswer().getValue();
    const feedback = saveAnswerFeedbackInfo.getFeedback().getValue();

    const saveQuestionFeedback = await this.urlInterviewQuestionRepository
      .createQueryBuilder('')
      .update()
      .set({ answer, feedback })
      .where('id=:questionId', { questionId })
      .execute();

    const saveQuestionFeedbackResult =
      saveQuestionFeedback.affected === 1 ? true : false;

    if (saveQuestionFeedbackResult === false) {
      throw new HttpException(
        'URL 인터뷰 답변,피드백이 저장되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return saveQuestionFeedbackResult;
  }
}
