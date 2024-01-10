import {
  Answer,
  CreateFeedbackInfo,
  Feedback,
  FindQuestion,
  Question,
  QuestionId,
  SaveAnswerFeedbackInfo,
} from '../../domain/value-objects/question/custom-question.vo';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  CreateFeedbackDto,
  FindOneQuestionDto,
  SaveAnswerFeedbackDto,
} from 'src/application/dtos/question/custom-question.dto';
import { IQuestionService } from 'src/application/services/question/question.interface';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import { User } from 'src/domain/interface/auth.interface';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';

@Controller('question')
export class QuestionController {
  constructor(
    @Inject('IQuestionService')
    private readonly questionService: IQuestionService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: ' 문제 피드백',
  })
  @Post('/create/feedback')
  async creatQuestionFeedback(
    @Body() creatAnswer: CreateFeedbackDto,
    @Res() res: Response,
  ): Promise<any> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const creatQuestionFeedback =
      await this.questionService.creatQuestionFeedback(
        new CreateFeedbackInfo(
          new Question(creatAnswer.question),
          new Answer(creatAnswer.answer),
        ),
      );

    for await (const chunk of creatQuestionFeedback) {
      if (chunk.choices[0].finish_reason === 'stop') {
        break;
      }
      for (const char of chunk.choices[0].delta.content) {
        res.write(`data: ${char}\n\n`); // 한 글자씩 EventSource로 전송
        await new Promise((resolve) => setTimeout(resolve, 100)); // 각 글자를 100ms 간격으로 전송
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 커스텀 문제 하나 찾기',
  })
  @Get('/custom/:id')
  async findOneCustomInterviewQuestion(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<FindOneQuestionDto> {
    const { kakaoId } = req.user as User;

    const findOneCustomInterviewQuestion =
      this.questionService.findOneCustomInterviewQuestion(
        new FindQuestion(new QuestionId(id), new UserKakaoId(kakaoId)),
      );
    return findOneCustomInterviewQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 url 문제 하나 찾기',
  })
  @Get('/url/:id')
  async findOneUrlInterviewQuestion(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<FindOneQuestionDto> {
    const { kakaoId } = req.user as User;

    const findOneUrlInterviewQuestion =
      this.questionService.findOneUrlInterviewQuestion(
        new FindQuestion(new QuestionId(id), new UserKakaoId(kakaoId)),
      );
    return findOneUrlInterviewQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 커스텀 문제 피드백 저장',
  })
  @Patch('/cutom/save/:id')
  async saveCustomQuestionAnswerFeedback(
    @Param('id') id: number,
    @Body() saveAnswerFeedbackDto: SaveAnswerFeedbackDto,
  ): Promise<boolean> {
    const saveFeedback =
      await this.questionService.saveCustomQuestionAnswerFeedback(
        new SaveAnswerFeedbackInfo(
          new QuestionId(id),
          new Answer(saveAnswerFeedbackDto.answer),
          new Feedback(saveAnswerFeedbackDto.feedback),
        ),
      );

    return saveFeedback;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 url 문제 피드백 저장',
  })
  @Patch('/url/save/:id')
  async saveUrlQuestionAnswerFeedback(
    @Param('id') id: number,
    @Body() saveAnswerFeedbackDto: SaveAnswerFeedbackDto,
  ): Promise<boolean> {
    const saveFeedback =
      await this.questionService.saveUrlQuestionAnswerFeedback(
        new SaveAnswerFeedbackInfo(
          new QuestionId(id),
          new Answer(saveAnswerFeedbackDto.answer),
          new Feedback(saveAnswerFeedbackDto.feedback),
        ),
      );

    return saveFeedback;
  }
}
