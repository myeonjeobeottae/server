import { IInterviewService } from './../../application/services/interview/interview.interface';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
  Inject,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import {
  CreateCustomInterviewDto,
  CustomInterviewDto,
  FindCustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import { User } from 'src/domain/interface/auth.interface';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  CustomInterviewInfo,
  FindOneInterview,
  InterviewId,
  Position,
  Stack,
  Time,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import { CompletQuestionDto } from 'src/application/dtos/question/question.dto';
import {
  CreateUrlInterviewDto,
  FindUrlInterviewDto,
  UrlinterviewDto,
} from 'src/application/dtos/interviews/url-interviews.dto';
import {
  UrlInterviewInfo,
  UrlValue,
} from 'src/domain/value-objects/interview/url-interview.vo';

@Controller('interviews')
export class InterviewsController {
  constructor(
    @Inject('IInterviewService')
    private readonly interviewService: IInterviewService,
  ) {}

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 생성 및 문제 생성',
  })
  @Post('/custom/create')
  async createCustomInterview(
    @Body() CreateCustomInterviewDto: CreateCustomInterviewDto,
    @Req() req: Request,
  ): Promise<CompletQuestionDto[]> {
    const { kakaoId } = req.user as User;

    const createInterview = await this.interviewService.createCustomInterview(
      new CustomInterviewInfo(
        new Position(CreateCustomInterviewDto.position),
        new Stack(CreateCustomInterviewDto.stack),
        new Time(CreateCustomInterviewDto.time),
        new UserKakaoId(kakaoId),
      ),
    );

    return createInterview;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '유저 커스텀 인터뷰 전체 찾기',
  })
  @Get('/custom')
  async findUserCustomInterviews(
    @Req() req: Request,
  ): Promise<CustomInterviewDto[]> {
    const { kakaoId } = req.user as User;

    const findUserCustomInterviews =
      await this.interviewService.findUserCustomInterviews(
        new UserKakaoId(kakaoId),
      );

    return findUserCustomInterviews;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '유저 커스텀 인터뷰 개별 찾기(문제 포함)',
  })
  @Get('/custom/:id')
  async FindOneInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<FindCustomInterviewDto> {
    const { kakaoId } = req.user as User;

    const findUserCustomInterviews =
      await this.interviewService.findOneCustomInterview(
        new FindOneInterview(new InterviewId(id), new UserKakaoId(kakaoId)),
      );

    return findUserCustomInterviews;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 삭제',
  })
  @Delete('/custom/delete/:id')
  async deleteCustomInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<boolean> {
    const { kakaoId } = req.user as User;
    const deleteCustomInterview =
      await this.interviewService.deleteCustomInterview(
        new FindOneInterview(new InterviewId(id), new UserKakaoId(kakaoId)),
      );
    return deleteCustomInterview;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'url 인터뷰 생성 및 문제 생성',
  })
  @Post('/url/create')
  async createUrlInterview(
    @Body() createUrlInterviewDto: CreateUrlInterviewDto,
    @Req() req: Request,
  ): Promise<CompletQuestionDto[]> {
    const { kakaoId } = req.user as User;

    const createUrlInterview = await this.interviewService.createUrlInterview(
      new UrlInterviewInfo(
        new UserKakaoId(kakaoId),
        new UrlValue(createUrlInterviewDto.URL),
        new Time(createUrlInterviewDto.time),
      ),
    );

    return createUrlInterview;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '유저 URL 인터뷰 전체 찾기',
  })
  @Get('/url')
  async findUserUrlInterviews(@Req() req: Request): Promise<UrlinterviewDto[]> {
    const { kakaoId } = req.user as User;

    const findUserCustomInterviews =
      await this.interviewService.findUserUrlInterviews(
        new UserKakaoId(kakaoId),
      );

    return findUserCustomInterviews;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '유저 Url 인터뷰 개별 찾기(문제 포함)',
  })
  @Get('/url/:id')
  async findOneUrlInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<FindUrlInterviewDto> {
    const { kakaoId } = req.user as User;

    const findUserUrlInterview =
      await this.interviewService.findOneUrlomInterview(
        new FindOneInterview(new InterviewId(id), new UserKakaoId(kakaoId)),
      );

    return findUserUrlInterview;
  }

  @ApiTags('Interview')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: 'Url 인터뷰 삭제',
  })
  @Delete('/url/delete/:id')
  async deleteUrlInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<boolean> {
    const { kakaoId } = req.user as User;
    const deleteUrlInterview = await this.interviewService.deleteUrlInterview(
      new FindOneInterview(new InterviewId(id), new UserKakaoId(kakaoId)),
    );
    return deleteUrlInterview;
  }
}
