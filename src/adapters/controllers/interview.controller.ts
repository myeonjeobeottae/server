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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth.guard';
import {
  CreateCustomInterviewDto,
  CustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import { User } from 'src/domain/interface/auth.interface';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  CustomInterviewInfo,
  Position,
  Stack,
  Time,
} from 'src/domain/value-objects/interview.vo';
import { CompletCustomQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { CustomInterviews } from 'src/domain/entities/interview.entity';

@Controller('interviews')
export class InterviewsController {
  constructor(
    @Inject('IInterviewService')
    private readonly interviewService: IInterviewService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 생성 및 문제 생성',
  })
  @Post('/custom/create')
  async createCustomInterview(
    @Body() CreateCustomInterviewDto: CreateCustomInterviewDto,
    @Req() req: Request,
  ): Promise<CompletCustomQuestionDto[]> {
    const { kakaoId } = req.user as User;

    if (!kakaoId) {
      throw new Error('Kakao ID is missing');
    }

    const customInterviewInfo = new CustomInterviewInfo(
      new Position(CreateCustomInterviewDto.position),
      new Stack(CreateCustomInterviewDto.stack),
      new Time(CreateCustomInterviewDto.time),
      new UserKakaoId(kakaoId),
    );

    const createInterview = await this.interviewService.createCustomInterview(
      customInterviewInfo,
    );

    return createInterview;
  }

  @ApiBearerAuth()
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
      await this.interviewService.findUserCustomInterviews(kakaoId);

    return findUserCustomInterviews;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '유저 커스텀 인터뷰 찾기(문제 포함)',
  })
  @Get('/custom/:id')
  async findCustomInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<CustomInterviews> {
    const { kakaoId } = req.user as User;

    const findUserCustomInterviews =
      await this.interviewService.findCustomInterview(id, kakaoId);

    return findUserCustomInterviews;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '커스텀 인터뷰 삭제',
  })
  @Delete('/custom/delete/:id')
  async deleteCustomInterview(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    const deleteCustomInterview =
      await this.interviewService.deleteCustomInterview(id, kakaoId);
    return deleteCustomInterview;
  }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: '커스텀 인터뷰 사용자 면접 찾기',
  //   })
  //   @Get('/custom')
  //   async findAll(@Req() req: Request): Promise<CreateCustomInterviewDto[]> {
  //     const { kakaoId } = req.user as User;

  //     const findAllInterview = await this.customInterviewsService.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterview;
  //   }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: '커스텀 인터뷰에 포함되어있는 문제들 전체 보여주기',
  //   })
  //   @Get('/custom/:id')
  //   async findAllQuestionsIncludedInTheInterview(
  //     @Param('id') id: number,
  //     @Req() req: Request,
  //   ): Promise<Question[]> {
  //     const { kakaoId } = req.user as User;
  //     const findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo =
  //       {
  //         interviewId: id,
  //         userKakaoId: kakaoId,
  //       };

  //     const findQuestionsIncludedInTheInterview =
  //       await this.questionService.QuestionsIncludedInTheInterview(
  //         findQuestionsIncludedInTheInterviewInfo,
  //       );

  //     return findQuestionsIncludedInTheInterview;
  //   }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: 'URL 분석 질문 10개 만들기 API',
  //   })
  //   @Post('/url')
  //   async createUrlInterview(
  //     @Body() careersInterviewDto: CareersInterviewDto,
  //     @Req() req: Request,
  //   ): Promise<any> {
  //     const { kakaoId } = req.user as User;
  //     if (!kakaoId) {
  //       throw new HttpException('Kakao ID is missing', HttpStatus.BAD_REQUEST);
  //     }

  //     const jobDescription =
  //       await this.careersInterviewsService.careersContentsRemoveSpace(
  //         careersInterviewDto,
  //         kakaoId,
  //       );

  //     const createQuestions = await this.gptChatService.createQuestionOfURL(
  //       jobDescription,
  //     );
  //     return createQuestions;
  //   }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: 'URL분석 인터뷰 사용자 면접 찾기',
  //   })
  //   @Get('/url')
  //   async urlInterviewFindAll(@Req() req: Request): Promise<CareersInterviews[]> {
  //     const { kakaoId } = req.user as User;

  //     const findAllInterviews = await this.careersInterviewsService.findAll(
  //       kakaoId,
  //     );
  //     return findAllInterviews;
  //   }

  //   @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  //   @ApiResponse({
  //     description: 'URL분석 인터뷰 에 포함되어있는 문제들 전체 보여주기',
  //   })
  //   @Get('/url/:id')
  //   async findAllQuestionsIncludedInTheUrlInterview(
  //     @Param('id') id: number,
  //     @Req() req: Request,
  //   ): Promise<CareersQuestion[]> {
  //     const { kakaoId } = req.user as User;
  //     const findQuestionsIncludedInTheInterviewInfo: FindQuestionsIncludedInTheInterviewInfo =
  //       {
  //         interviewId: id,
  //         userKakaoId: kakaoId,
  //       };

  //     const findQuestionsIncludedInTheUrlInterview =
  //       await this.careersQuestionService.QuestionsIncludedInTheInterview(
  //         findQuestionsIncludedInTheInterviewInfo,
  //       );

  //     return findQuestionsIncludedInTheUrlInterview;
  //   }
}
