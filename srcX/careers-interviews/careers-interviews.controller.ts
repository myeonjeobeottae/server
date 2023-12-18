import { GptChatService } from 'srcX/gpt-chat/gpt-chat.service';
import { CareersQuestionService } from '../careers-question/careers-question.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CareersInterviewsService } from './careers-interviews.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'srcX/auth/model/auth.model';
import { CareersInterviewDto } from './dto/create-careers-interview.dto';
import { SaveCareersQuestionDto } from 'srcX/careers-question/dto/create-careersQuestion.dto';
import { CareersInterviews } from './entities/careers-interview.entity';
import { CareersQuestion } from 'srcX/careers-question/entities/careers-question.entity';
import { FindQuestionsIncludedInTheInterviewInfo } from 'srcX/question/model/question.model';

@Controller('careers/interviews')
export class CareersInterviewsController {
  constructor(
    private readonly careersInterviewsService: CareersInterviewsService,
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
      await this.careersInterviewsService.careersContentsRemoveSpace(
        careersInterviewDto,
        kakaoId,
      );

    const createQuestions = await this.gptChatService.createQuestionOfURL(
      jobDescription,
    );
    return createQuestions;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'URL분석 인터뷰 사용자 면접 찾기',
  })
  @Get()
  async findAll(@Req() req: Request): Promise<CareersInterviews[]> {
    const { kakaoId } = req.user as User;

    const findAllInterviews = await this.careersInterviewsService.findAll(
      kakaoId,
    );
    return findAllInterviews;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'URL분석 인터뷰 에 포함되어있는 문제들 전체 보여주기',
  })
  @Get('/:id')
  async findQuestionsIncludedInTheInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<CareersQuestion[]> {
    const { kakaoId } = req.user as User;
    const findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo =
      {
        interviewId: id,
        userKakaoId: kakaoId,
      };

    const findQuestionsIncludedInTheInterview =
      await this.careersQuestionService.QuestionsIncludedInTheInterview(
        findQuestionsIncludedInTheInterviewInfo,
      );

    return findQuestionsIncludedInTheInterview;
  }
}
