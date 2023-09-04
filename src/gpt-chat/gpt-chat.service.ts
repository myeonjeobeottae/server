import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-gpt-chat.dto';
import { UpdateGptChatDto } from './dto/update-gpt-chat.dto';

@Injectable()
export class GptChatService {
  create(createQuestion: CreateQuestionDto) {
    return 'This action adds a new gptChat';
  }

  findAll() {
    return `This action returns all gptChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gptChat`;
  }

  update(id: number, updateGptChatDto: UpdateGptChatDto) {
    return `This action updates a #${id} gptChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} gptChat`;
  }
}
