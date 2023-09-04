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
} from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { CreateQuestionDto } from './dto/create-gpt-chat.dto';
import { UpdateGptChatDto } from './dto/update-gpt-chat.dto';
import { Response } from 'express';
import OpenAI from 'openai';

@Controller('gpt-chat')
export class GptChatController {
  constructor(
    @Inject('OpenAi')
    private readonly openAi: OpenAI,
    private readonly gptChatService: GptChatService,
  ) {}

  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
  ): Promise<any> {
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
    // res.json({ question: createQuestion });
    return createQuestion; //테스트를 할때만 return 사용
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
