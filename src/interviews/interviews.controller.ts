import { QuestionService } from './../question/question.service';
import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/auth/model/auth.model';
import { Question } from 'src/question/entities/question.entity';
import { FindQuestionsIncludedInTheInterviewInfo } from 'src/question/model/question.model';

@Controller('interviews')
export class InterviewsController {
  constructor(
    private readonly interviewsService: InterviewsService,
    private readonly questionService: QuestionService,
  ) {}

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
