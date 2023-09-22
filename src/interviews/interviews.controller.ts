import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import {
  CreateInterviewDto,
  CreateQuestionDto,
} from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/auth/model/auth.model';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post('/:id')
  saveQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param() id: number,
    @Query() QNo: number,
  ) {
    console.log(id, createQuestionDto, QNo);

    // return this.interviewsService.create(createInterviewDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '사용자 면접 찾기',
  })
  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const { kakaoId } = req.user as User;

    const findAllInterview = await this.interviewsService.findAll(kakaoId);
    res.json(findAllInterview);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.interviewsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInterviewDto: UpdateInterviewDto,
  // ) {
  //   return this.interviewsService.update(+id, updateInterviewDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.interviewsService.remove(+id);
  // }
}
