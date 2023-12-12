import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CareersQuestionService } from './careers-question.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { SaveQuestionDto } from 'src/question/dto/create-question.dto';
import { User } from 'src/auth/model/auth.model';
import {
  FindOneQuestionInfo,
  SaveQuestionInfo,
} from 'src/question/model/question.model';
import { Question } from 'src/question/entities/question.entity';
import { Request } from 'express';

@Controller('careers/question')
export class CareersQuestionController {
  constructor(
    private readonly careersQuestionService: CareersQuestionService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 포스팅 인터뷰 저장',
  })
  @Post()
  async saveQuestion(
    @Body() saveQuestionDto: SaveQuestionDto,
    @Req() req: Request,
  ): Promise<SaveQuestionDto> {
    const { kakaoId } = req.user as User;

    const saveQuestionInfo: SaveQuestionInfo = {
      ...saveQuestionDto,
      userKakaoId: kakaoId,
    };

    const saveQuestion = await this.careersQuestionService.saveQuestion(
      saveQuestionInfo,
    );

    return saveQuestion;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'url분석 문제 하나 보기',
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

    const findOneQuestion = await this.careersQuestionService.findOneQuestion(
      findOneQuestionInfo,
    );
    return findOneQuestion;
  }
}
