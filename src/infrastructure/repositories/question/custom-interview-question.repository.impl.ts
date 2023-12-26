import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewQuestion } from 'src/domain/entities/question.entity';
import {
  CompletSaveQuestion,
  SaveQuestionInfo,
} from 'src/domain/interface/question.interface';
import { CustomInterviewQuestionRepository } from 'src/domain/repositories/custom-interview-question.repository';
import { Repository } from 'typeorm';

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
  ): Promise<CompletSaveQuestion> {
    const { content, interview } = saveQuestionInfo;
    const createQuestion = this.customInterviewQuestionRepository.create({
      question: content,
      interview: interview,
    });

    const saveQuestion = await this.customInterviewQuestionRepository.save(
      createQuestion,
    );

    const completSaveQuestion: CompletSaveQuestion = {
      ...saveQuestion, // 기존의 모든 필드를 복사
      interview: saveQuestion.interview.id, // interview 필드를 id로 변경
    };

    return completSaveQuestion;
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
