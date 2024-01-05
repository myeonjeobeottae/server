import { DataSource } from 'typeorm';
import { OpenAIService } from 'src/infrastructure/external-services/openAI/openAI.service';
import { UserService } from 'src/domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';

import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
  InterviewInfo,
  Position,
} from 'src/domain/value-objects/interview.vo';

import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { CustomInterviewDto } from 'src/application/dtos/interviews/custom-interviews.dto';
import {
  CreateCustomInterviewQuestionInfo,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';
import { CustomInterviews } from 'src/domain/entities/interview.entity';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
    @Inject('IOpenAIService')
    private readonly openAIService: OpenAIService,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletCustomQuestionDto[]> {
    return await this.dataSource.transaction(async (entityManager) => {
      const findUser = await this.userService.findUser(
        customInterviewInfo.getUserKakaoId(),
      );

      const createCustomInterviewInfo = new CreateCustomInterviewInfo(
        customInterviewInfo.getPosition(),
        customInterviewInfo.getStack(),
        customInterviewInfo.getTime(),
        findUser,
      );
      const saveInterview =
        await this.customInterviewsService.createCustomInterview(
          createCustomInterviewInfo,
          entityManager,
        );

      const createCustomInterviewQuestionInfo =
        new CreateCustomInterviewQuestionInfo(
          customInterviewInfo.getPosition(),
          customInterviewInfo.getStack(),
        );

      const createQuestion =
        await this.openAIService.createCustomInterviewQuestion(
          createCustomInterviewQuestionInfo,
        );
      const saveQuestionInfo = new SaveQuestionInfo(
        createQuestion,
        saveInterview,
      );

      const saveQuestions =
        await this.customInterviewQuestionService.createQuestion(
          saveQuestionInfo,
          entityManager,
        );

      return saveQuestions;
    });
  }

  async findUserCustomInterviews(
    userKakaoId: string,
  ): Promise<CustomInterviewDto[]> {
    const findUserCustomInterviews =
      await this.customInterviewsService.findUserCustomInterviews(
        new UserKakaoId(userKakaoId),
      );

    const userCustomInterviews = findUserCustomInterviews.map(
      (customInterview) => {
        return customInterview.getValue();
      },
    );
    return userCustomInterviews;
  }

  async findCustomInterview(
    id: number,
    userKakaoId: string,
  ): Promise<CustomInterviews> {
    const findUserCustomInterviews =
      await this.customInterviewsService.findCustomInterview(
        id,
        new UserKakaoId(userKakaoId),
      );
    const customInterviews: CustomInterviews = {
      id: findUserCustomInterviews.getValue().id,
      stack: findUserCustomInterviews.getValue().stack,
      position: findUserCustomInterviews.getValue().position,
      time: findUserCustomInterviews.getValue().time,
      user: findUserCustomInterviews.getValue().user,
      question: findUserCustomInterviews.getValue().question,
    };

    return customInterviews;
  }

  async deleteCustomInterview(id: number, kakaoId: string): Promise<boolean> {
    const deleteCustomInterview =
      await this.customInterviewsService.deleteCustomInterview(id, kakaoId);
    return deleteCustomInterview;
  }

  //   async findAll(kakaoId: string): Promise<CreateCustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
