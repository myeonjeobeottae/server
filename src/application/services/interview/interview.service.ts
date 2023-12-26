import {
  CreateCustomInterviewQuestionInfo,
  SaveQuestionInfo,
} from './../../../domain/interface/question.interface';
import { OpenAIService } from 'src/infrastructure/external-services/openAI/openAI.service';
import { UserService } from 'src/domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';
import {
  CustomInterviewInfo,
  CreateCustomInterviewInfo,
} from 'src/domain/interface/interview.interface';
import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
    @Inject('IOpenAIService')
    private readonly openAIService: OpenAIService,
  ) {}
  //CustomInterviewDto[]
  async createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<any> {
    const findUser = await this.userService.findUser(
      customInterviewInfo.userKakaoId,
    );
    const createCustomInterviewInfo: CreateCustomInterviewInfo = {
      user: findUser,
      ...customInterviewInfo,
    };

    const saveInterview =
      await this.customInterviewsService.createCustomInterview(
        createCustomInterviewInfo,
      );

    const createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo =
      {
        position: customInterviewInfo.position,
        skill: customInterviewInfo.skill,
      };

    const createQuestion =
      await this.openAIService.createCustomInterviewQuestion(
        createCustomInterviewQuestionInfo,
      );

    const saveQuestionInfo: SaveQuestionInfo = {
      ...createQuestion,
      interview: saveInterview,
    };

    const saveQuestions =
      await this.customInterviewQuestionService.createQuestion(
        saveQuestionInfo,
      );

    return saveQuestions;
  }

  //   async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
