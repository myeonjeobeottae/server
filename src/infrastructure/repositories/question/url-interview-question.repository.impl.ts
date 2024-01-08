import { Inject, Injectable } from '@nestjs/common';
import { UrlInterviewQuestion } from 'src/domain/entities/question.entity';
import { UrlInterviewQuestionRepository } from 'src/domain/repositories/question/url-interview-question.repository';
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
}
