import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { CreatAnswerDto, CreateQuestionDto } from './dto/create-gpt-chat.dto';
import { UpdateGptChatDto } from './dto/update-gpt-chat.dto';
import { Response, Request } from 'express';
import OpenAI from 'openai';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('gpt-chat')
export class GptChatController {
  constructor(
    @Inject('OpenAi')
    private readonly openAi: OpenAI,
    private readonly gptChatService: GptChatService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    description: '질문 만들기 API',
  })
  @Post('/createQustion')
  @ApiBody({ type: CreateQuestionDto })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
  ): Promise<any> {
    // const { kak, nickname } = req.user;
    const { position, skill } = createQuestionDto;
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${position} ${skill} 면접 질문 10개 만들어줘`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const createQuestion = completion.choices[0].message.content;

    res.json(createQuestion);
    // return createQuestion; //테스트를 할때만 return 사용
  }

  @Post('/createFeedback')
  async creatFeedback(
    @Body() creatAnswer: CreatAnswerDto,
    @Res() res: Response,
  ): Promise<any> {
    const { question, answer } = creatAnswer;

    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `문제:${question} 답변:${answer} 답변에 내용을 틀린점이 있으면 알려주고 부족한 점을 보안해줘`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const createFeedback = completion.choices[0].message.content;
    res.json(createFeedback);
    // return createFeedback;
  }

  @Get()
  findAll() {
    return this.gptChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptChatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGptChatDto: UpdateGptChatDto) {
    return this.gptChatService.update(+id, updateGptChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptChatService.remove(+id);
  }
}
