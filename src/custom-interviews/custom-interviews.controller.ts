import { GptChatService } from '../gpt-chat/gpt-chat.service';
import { QuestionService } from '../question/question.service';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomInterviewsService } from './custom-interviews.service';
import { CustomInterviewDto } from './dto/create-customInterviews.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/auth/model/auth.model';
import { Question } from 'src/question/entities/question.entity';
import { FindQuestionsIncludedInTheInterviewInfo } from 'src/question/model/question.model';
import { CreateQuestionsDto } from 'src/gpt-chat/dto/create-gpt-chat.dto';
import { CustomInterviewInfo } from './model/customInterviews.model';

@Controller('custom/interviews')
export class CustomInterviewsController {
  constructor(
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly questionService: QuestionService,
    private readonly gptChatService: GptChatService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 질문 한개 만들기 API',
  })
  @Post('createQuestionOne')
  async createInterviewQuestionOne(
    @Body() customInterviewDto: CustomInterviewDto,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    const { position, skill, time } = customInterviewDto;

    if (!kakaoId) {
      throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
    }
    const customInterviewInfo: CustomInterviewInfo = {
      userKakaoId: kakaoId,
      position,
      skill,
      time,
    };
    const saveInterview = await this.customInterviewsService.saveInterview(
      customInterviewInfo,
    );

    const createQuestion = await this.gptChatService.createQuestionOne(
      customInterviewDto,
    );
    return createQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 질문 9개 만들기 API',
  })
  @Post('createQuestions')
  async createInterviewQuestions(
    @Body() createQuestionsDto: CreateQuestionsDto,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    if (!kakaoId) {
      throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
    }

    const createQuestions = await this.gptChatService.createQuestions(
      createQuestionsDto,
    );
    return createQuestions;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 사용자 면접 찾기',
  })
  @Get()
  async findAll(@Req() req: Request): Promise<CustomInterviewDto[]> {
    const { kakaoId } = req.user as User;

    const findAllInterview = await this.customInterviewsService.findAll(
      kakaoId,
    );
    return findAllInterview;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰에 포함되어있는 문제들 전체 보여주기',
  })
  @Get('/:id')
  async findQuestionsIncludedInTheInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<Question[]> {
    const { kakaoId } = req.user as User;
    const findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo =
      {
        interviewId: id,
        userKakaoId: kakaoId,
      };

    const findQuestionsIncludedInTheInterview =
      await this.questionService.QuestionsIncludedInTheInterview(
        findQuestionsIncludedInTheInterviewInfo,
      );

    return findQuestionsIncludedInTheInterview;
  }
}
