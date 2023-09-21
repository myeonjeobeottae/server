import { Injectable } from '@nestjs/common';

@Injectable()
export class GptChatService {
  create(userId: number) {
    return 'This action adds a new gptChat';
  }
}
