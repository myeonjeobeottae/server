import { GptChatService } from 'src/gpt-chat/gpt-chat.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { SaveQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from 'src/auth/model/auth.model';
import { FindOneQuestionInfo, SaveQuestionInfo } from './model/question.model';
import { Question } from './entities/question.entity';
import { CreatAnswerDto } from 'src/gpt-chat/dto/create-gpt-chat.dto';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly gptChatService: GptChatService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 커스텀 문제 피드백',
  })
  @Post('/feedback')
  async creatQuestionFeedback(
    @Body() creatAnswer: CreatAnswerDto,
    @Res() res: Response,
  ): Promise<any> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const creatQuestionFeedback =
      await this.gptChatService.createQuestionFeedback(creatAnswer);

    for await (const chunk of creatQuestionFeedback) {
      for (const char of chunk.choices[0].delta.content.toString()) {
        res.write(`data: ${char}\n\n`); // 한 글자씩 EventSource로 전송
        await new Promise((resolve) => setTimeout(resolve, 100)); // 각 글자를 100ms 간격으로 전송
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 인터뷰 저장',
  })
  @Post()
  async saveQuestion(
    @Body() saveQuestionDto: SaveQuestionDto,
    @Req() req: Request,
  ): Promise<SaveQuestionDto> {
    const { kakaoId } = req.user as User;

    const { interviewId, question, answer, feedback } = saveQuestionDto;
    const saveQuestionInfo: SaveQuestionInfo = {
      interviewId,
      question,
      answer,
      feedback,
      userKakaoId: kakaoId,
    };

    const saveQuestion = await this.questionService.saveQuestion(
      saveQuestionInfo,
    );

    return saveQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '문제 하나 보기',
  })
  @Get(':id')
  async findOneQuestion(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<Question> {
    const { kakaoId } = req.user as User;
    const findOneQuestionInfo: FindOneQuestionInfo = {
      questionId: id,
      userKakaoId: kakaoId,
    };

    const findOneQuestion = await this.questionService.findOneQuestion(
      findOneQuestionInfo,
    );
    if (!findOneQuestion) {
      throw new HttpException('해당 문제가 없습니다.', HttpStatus.BAD_REQUEST);
    }
    return findOneQuestion;
  }
}
