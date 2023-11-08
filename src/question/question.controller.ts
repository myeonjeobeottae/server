import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { SaveQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/auth/model/auth.model';
import { FindOneQuestionInfo, SaveQuestionInfo } from './model/question.model';
import { Question } from './entities/question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

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
    console.log(kakaoId);

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
