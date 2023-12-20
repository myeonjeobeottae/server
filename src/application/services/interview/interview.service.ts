import { UserService } from 'src/domain/services/user/user.service';
import { Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';
import {
  CustomInterviewInfo,
  CreateCustomInterviewInfo,
} from 'src/domain/interface/interview.interface';
import { CustomInterviewDto } from 'src/application/dtos/interviews/create-custom-interviews.dto';
import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
  ) {}

  async createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const findUser = await this.userService.findUser(
      customInterviewInfo.userKakaoId,
    );
    const saveCustomInterviewInfo: CreateCustomInterviewInfo = {
      user: findUser,
      ...customInterviewInfo,
    };

    const saveInterview =
      await this.customInterviewsService.createCustomInterview(
        saveCustomInterviewInfo,
      );
    return saveInterview;
  }

  //   async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
  //     const findAllInterview = await this.customInterviewRepository.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }
}
