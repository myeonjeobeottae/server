import { GptChatService } from './../gpt-chat/gpt-chat.service';
import { QuestionService } from './../question/question.service';
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
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/auth/model/auth.model';
import { Question } from 'src/question/entities/question.entity';
import { FindQuestionsIncludedInTheInterviewInfo } from 'src/question/model/question.model';
import {
  CreateQuestionDto,
  CreateQuestionsDto,
} from 'src/gpt-chat/dto/create-gpt-chat.dto';
import { UrlInfo } from './model/interviews.model';

@Controller('interviews')
export class InterviewsController {
  constructor(
    private readonly interviewsService: InterviewsService,
    private readonly questionService: QuestionService,
    private readonly gptChatService: GptChatService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '질문 한개 만들기 API',
  })
  @Post('/createQuestionOne')
  async createInterviewQuestionOne(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    if (!kakaoId) {
      throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
    }
    const saveInterview = await this.interviewsService.saveInterview(
      createQuestionDto,
      kakaoId,
    );

    const createQuestion = await this.gptChatService.createQuestionOne(
      createQuestionDto,
    );
    return createQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '질문 9개 만들기 API',
  })
  @Post('/createQuestions')
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
    description: 'URL 분석 질문 10개 만들기 API',
  })
  @Post('/wanted')
  async createInterviewQuestionsOfURL(
    @Body() url: UrlInfo,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    if (!kakaoId) {
      throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
    }

    const jobDescription = await this.interviewsService.wantedGetHtml(url);

    const createQuestions = await this.gptChatService.createQuestionOfURL(
      jobDescription,
    );
    return createQuestions;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 면접 찾기',
  })
  @Get()
  async findAll(@Req() req: Request): Promise<CreateInterviewDto[]> {
    const { kakaoId } = req.user as User;

    const findAllInterview = await this.interviewsService.findAll(kakaoId);
    return findAllInterview;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '인터뷰에 포함되어있는 문제들 전체 보여주기',
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
