import { AuthRepository } from './../auth/auth.repository';
import { Injectable } from '@nestjs/common';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';
import {
  CustomInterviewInfo,
  SaveCustomInterviewInfo,
} from './model/customInterviews.model';
import { CustomInterviewRepository } from './custom-interview.repository';

@Injectable()
export class CustomInterviewsService {
  constructor(
    private customInterviewRepository: CustomInterviewRepository,
    private authRepository: AuthRepository,
  ) {}

  async saveInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const findUser = await this.authRepository.findUser(
      customInterviewInfo.userKakaoId,
    );
    const saveCustomInterviewInfo: SaveCustomInterviewInfo = {
      user: findUser,
      ...customInterviewInfo,
    };

    const saveInterview = await this.customInterviewRepository.saveInterview(
      saveCustomInterviewInfo,
    );
    return saveInterview;
  }

  async findAll(kakaoId: string): Promise<CustomInterviewDto[]> {
    const findAllInterview = await this.customInterviewRepository.findAll(
      kakaoId,
    );
    return findAllInterview;
  }
}
