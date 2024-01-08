import { DataSource } from 'typeorm';
import { UserService } from 'src/domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';

import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
} from 'src/domain/value-objects/interview.vo';

import {
  CompletCustomQuestionDto,
  FindCustomInterviewOfQuestionDto,
} from 'src/application/dtos/question/custom-question.dto';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  CustomInterviewDto,
  FindCustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import {
  CreateCustomInterviewQuestionInfo,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
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
          saveInterview,
        );

      const createQuestion =
        await this.customInterviewQuestionService.createQuestion(
          createCustomInterviewQuestionInfo,
        );

      const saveQuestionInfo = new SaveQuestionInfo(
        createQuestion,
        saveInterview,
      );

      const saveQuestions =
        await this.customInterviewQuestionService.saveQuestion(
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
  ): Promise<FindCustomInterviewDto> {
    const findUserCustomInterviews =
      await this.customInterviewsService.findCustomInterview(
        id,
        new UserKakaoId(userKakaoId),
      );

    const findUserCustomInterviewOfQuestion = findUserCustomInterviews
      .getFindCustomInterviewOfQuestion()
      .map((qusetion) => {
        const completCustomQuestionDto: FindCustomInterviewOfQuestionDto = {
          id: qusetion.getQuestionId().getValue(),
          question: qusetion.getQuestion().getValue(),
        };
        return completCustomQuestionDto;
      });

    const customInterviews: FindCustomInterviewDto = {
      id: findUserCustomInterviews.getInterviewId().getValue(),
      stack: findUserCustomInterviews.getStack().getValue(),
      position: findUserCustomInterviews.getPosition().getValue(),
      time: findUserCustomInterviews.getTime().getValue(),
      question: findUserCustomInterviewOfQuestion,
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
