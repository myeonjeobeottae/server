import { GptChatService } from 'src/gpt-chat/gpt-chat.service';
import { CareersQuestionService } from './../careers-question/posting-question.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CareeresInterviewsService } from './careeres-interviews.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/auth/model/auth.model';
import { CareersInterviewDto } from './dto/create-careeres-interview.dto';

@Controller('careeres/interviews')
export class CareeresInterviewsController {
  constructor(
    private readonly careeresInterviewsService: CareeresInterviewsService,
    private readonly careersQuestionService: CareersQuestionService,
    private readonly gptChatService: GptChatService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'URL 분석 질문 10개 만들기 API',
  })
  @Post()
  async createInterviewQuestionsOfURL(
    @Body() careersInterviewDto: CareersInterviewDto,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;

    if (!kakaoId) {
      throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
    }

    const jobDescription =
      await this.careeresInterviewsService.careersContentsRemoveSpace(
        careersInterviewDto,
      );

    const createQuestions = await this.gptChatService.createQuestionOfURL(
      jobDescription,
    );
    return createQuestions;
  }
}
