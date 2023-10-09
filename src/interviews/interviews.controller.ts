import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/auth/model/auth.model';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

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

  //todo
  //??인터뷰에 포함되어있는 문제들 전체 보여주기
}
