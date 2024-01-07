import {
  Answer,
  CreateQuestionFeedback,
  Question,
  QuestionId,
} from './../../domain/value-objects/question.vo';
import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateFeedbackDto } from 'src/application/dtos/question/custom-question.dto';
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
    description: '사용자 커스텀 문제 피드백',
  })
  @Post('/feedback/:id')
  async creatQuestionFeedback(
    @Param('id') id: number,
    @Body() creatAnswer: CreateFeedbackDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const { kakaoId } = req.user as User;
    const createQuestionFeedback = new CreateQuestionFeedback(
      new QuestionId(id),
      new Question(creatAnswer.question),
      new UserKakaoId(kakaoId),
      new Answer(creatAnswer.answer),
    );

    const creatQuestionFeedback =
      await this.questionService.creatQuestionFeedback(createQuestionFeedback);

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

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: '사용자 인터뷰 저장',
  //   })
  //   @Post()
  //   async saveQuestion(
  //     @Body() saveQuestionDto: SaveQuestionDto,
  //     @Req() req: Request,
  //   ): Promise<SaveQuestionDto> {
  //     const { kakaoId } = req.user as User;

  //     const saveQuestionInfo: SaveQuestionInfo = {
  //       ...saveQuestionDto,
  //       userKakaoId: kakaoId,
  //     };

  //     const saveQuestion = await this.questionService.saveQuestion(
  //       saveQuestionInfo,
  //     );

  //     return saveQuestion;
  //   }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: '문제 하나 보기',
  //   })
  //   @Get(':id')
  //   async findOneQuestion(
  //     @Param('id') id: number,
  //     @Req() req: Request,
  //   ): Promise<Question> {
  //     const { kakaoId } = req.user as User;
  //     const findOneQuestionInfo: FindOneQuestionInfo = {
  //       questionId: id,
  //       userKakaoId: kakaoId,
  //     };

  //     const findOneQuestion = await this.questionService.findOneQuestion(
  //       findOneQuestionInfo,
  //     );

  //     return findOneQuestion;
  //   }
}
