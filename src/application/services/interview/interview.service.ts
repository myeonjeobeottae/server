import { OpenAIService } from 'src/infrastructure/external-services/openAI/openAI.service';
import { UserService } from 'src/domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';

import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  InterviewInfo,
  Position,
} from 'src/domain/value-objects/interview.vo';
import {
  CompletSaveQuestion,
  CreateCustomInterviewQuestionInfo,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question.vo';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
    @Inject('IOpenAIService')
    private readonly openAIService: OpenAIService,
  ) {}

  async createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletCustomQuestionDto[]> {
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
