import { Inject, Injectable } from '@nestjs/common';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';
import { CustomInterviewInfo } from './model/customInterviews.model';
import { Repository } from 'typeorm';
import { CustomInterviews } from './entities/customInterviews.entity';
import { CreateQuestionDto } from 'src/gpt-chat/dto/create-gpt-chat.dto';
import Cheerio from 'cheerio';
import { CustomInterviewRepository } from './custom-interview.repository';

@Injectable()
export class CustomInterviewsService {
  constructor(private customInterviewRepository: CustomInterviewRepository) {}

  async saveInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CustomInterviewDto> {
    const saveInterview = await this.customInterviewRepository.saveInterview(
      customInterviewInfo,
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
