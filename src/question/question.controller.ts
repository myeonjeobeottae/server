import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { SaveQuestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

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
  ): Promise<SaveQuestionDto> {
    const saveQuestion = await this.questionService.saveQuestion(
      saveQuestionDto,
    );

    return saveQuestion;
  }
}
