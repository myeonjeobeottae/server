import { Inject, Injectable } from '@nestjs/common';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviewQuestion } from 'src/domain/entities/question.entity';

import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { SaveQuestionInfo } from 'src/domain/value-objects/question.vo';
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
    //만들어지 문제 보여주기 - 인터뷰 정보 추려서 보여줘야함 생성된 문제 전체 보여주는 함수 있어야함
    // return saveQuestion;
  }

  // async QuestionsIncludedInTheInterview(interview: interview): Promise<> {
  //   const { interviewId, userKakaoId } =
  //     findQuestionsIncludedInTheInterviewInfo;

  //   // const questionsIncludedInTheInterview =
  //   //   await this.customInterviewQuestionRepository.find({
  //   //     select: ['id', 'question', 'answer', 'feedback','interview'],
  //   //     where: { interview: {id:interviewId}, userKakaoId: userKakaoId },
  //   //   });

  //   const questionsIncludedInTheInterview =
  //     await this.customInterviewQuestionRepository
  //       .createQueryBuilder('customInterviewQuestion')
  //       .where('customInterviewQuestion.interview.id');
  //   return questionsIncludedInTheInterview;
  //   async findOneQuestion(
  //     findOneQuestionInfo: FindOneQuestionInfo,
  //   ): Promise<Question> {
  //     const { questionId, userKakaoId } = findOneQuestionInfo;

  //     const findOneQuestion = await this.questionRepository.findOne({
  //       where: { id: questionId, userKakaoId },
  //       select: ['id', 'question', 'answer', 'feedback'],
  //     });

  //     return findOneQuestion;
  //   }
}
