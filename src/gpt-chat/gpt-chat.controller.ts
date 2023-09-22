import { InterviewsService } from './../interviews/interviews.service';
import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import {
  CreatAnswerDto,
  CreateQuestionDto,
  CreateQuestionsDto,
} from './dto/create-gpt-chat.dto';
import { Response, Request } from 'express';
import OpenAI from 'openai';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/model/auth.model';

@Controller('gpt-chat')
export class GptChatController {
  constructor(
    @Inject('OpenAi')
    private readonly openAi: OpenAI,
    private readonly gptChatService: GptChatService,
    private readonly interviewsService: InterviewsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '질문 한개 만들기 API',
  })
  @Post('/createQuestionOne')
  @ApiBody({ type: CreateQuestionDto })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { kakaoId } = req.user as User;
    if (!kakaoId) {
      throw new Error();
    }
    const { position, skill } = createQuestionDto;
    const createQuestion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${position} ${skill} 면접 질문 1개 만들어줘 `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const complet = {
      content: createQuestion.choices[0].message.content,
    };
    await this.interviewsService.createInterview(kakaoId);
    res.json(complet);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '질문 9개 만들기 API',
  })
  @Post('/createQuestions')
  @ApiBody({ type: CreateQuestionsDto })
  async createQuestions(
    @Body() createQuestionsDto: CreateQuestionsDto,
    @Res() res: Response,
  ): Promise<any> {
    const { firstQuestion, position, skill } = createQuestionsDto;
    const createQuestion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${position} ${skill}면접 질문 다시 9개 만들어주는데 ${firstQuestion}. 를 제외한 질문 만들어줘  `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const complet = {
      content: createQuestion.choices[0].message.content,
    };

    res.json(complet);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '답변 피드백 만들기',
  })
  @Post('/createFeedback')
  async creatFeedback(
    @Body() creatAnswer: CreatAnswerDto,
    @Res() res: Response,
  ): Promise<any> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const { question, answer } = creatAnswer;

    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `문제:${question} 답변:${answer} 답변에 내용을 틀린점이 있으면 알려주고 부족한 점을 보안해줘`,
        },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    });

    for await (const chunk of completion) {
      for (const char of chunk.choices[0].delta.content.toString()) {
        res.write(`data: ${char}\n\n`); // 한 글자씩 EventSource로 전송
        await new Promise((resolve) => setTimeout(resolve, 100)); // 각 글자를 100ms 간격으로 전송
      }
    }
  }
}
