import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewRepository } from 'src/domain/repositories/interview/custom-interview.repository';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInstance,
  FindCustomInterview,
  FindOneInterview,
  InterviewId,
  Position,
  Stack,
  Time,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import { EntityManager } from 'typeorm';
import {
  FindInterviewOfQuestion,
  Question,
  QuestionId,
} from 'src/domain/value-objects/question/custom-question.vo';

@Injectable()
export class CustomInterviewsService {
  constructor(
    @Inject('CustomInterviewRepository')
    private customInterviewRepository: CustomInterviewRepository,
  ) {}

  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<CustomInterviewInstance> {
    const saveInterview =
      await this.customInterviewRepository.createCustomInterview(
        createCustomInterviewInfo,
        entityManager,
      );

    return new CustomInterviewInstance(saveInterview);
  }

  async findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviewInstance[]> {
    const findUserCustomInterviews =
      await this.customInterviewRepository.findUserCustomInterviews(
        userKakaoId,
      );
    const userCustomInterviews = findUserCustomInterviews.map(
      (customInterview) => {
        return new CustomInterviewInstance(customInterview);
      },
    );

    return userCustomInterviews;
  }

  async findOneCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<FindCustomInterview> {
    const findCustomInterview =
      await this.customInterviewRepository.findOneCustomInterview(
        findOneInterview,
      );

    const findCustomInterviewOfQuestions = findCustomInterview.question.map(
      (question) => {
        return new FindInterviewOfQuestion(
          new QuestionId(question.id),
          new Question(question.question),
        );
      },
    );

    const customInterview = new FindCustomInterview(
      new InterviewId(findCustomInterview.id),
      new Position(findCustomInterview.position),
      new Stack(findCustomInterview.stack),
      new Time(findCustomInterview.time),
      findCustomInterviewOfQuestions,
    );

    return customInterview;
  }

  async deleteCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const deleteCustomInterview =
      await this.customInterviewRepository.deleteCustomInterview(
        findOneInterview,
      );
    return deleteCustomInterview;
  }
}
