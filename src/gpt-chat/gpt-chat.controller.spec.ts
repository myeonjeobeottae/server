import { Test, TestingModule } from '@nestjs/testing';
import { GptChatController } from './gpt-chat.controller';
import { GptChatService } from './gpt-chat.service';
import { CreatAnswerDto, CreateQuestionDto } from './dto/create-gpt-chat.dto';
import { request, response } from 'express';
import { OpenAiProvider } from './gpt-chat.provider';
import { ConfigModule } from '@nestjs/config';
import openAiConfig from '../config/openAi.config';

describe('GptChatController', () => {
  let controller: GptChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [openAiConfig],
        }),
      ],
      controllers: [GptChatController],
      providers: [GptChatService, OpenAiProvider],
    }).compile();

    controller = module.get<GptChatController>(GptChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createQuestion', () => {
    it('should create a question', async () => {
      const createQuestion: CreateQuestionDto = {
        position: 'frontend',
        skill: 'JavaScript',
      };

      // OpenAI API 호출을 모의(Mock)화하여 원하는 응답을 반환하도록 설정
      jest
        .spyOn(controller['openAi'].chat.completions, 'create')
        .mockResolvedValue({
          id: 'sample-id', // 이 부분은 실제 API 응답에서 얻어지는 'id' 값입니다.
          created: Date.now(), // 이 부분은 실제 API 응답에서 얻어지는 'created' 값입니다.
          model: 'gpt-3.5-turbo', // 이 부분은 실제 API 응답에서 얻어지는 'model' 값입니다.
          object: 'chat.completion', // 이 부분은 실제 API 응답에서 얻어지는 'object' 값입니다.
          choices: [
            {
              message: {
                role: 'assistant',
                content: 'Sample question',
              },
              finish_reason: 'stop',
              index: 0,
            },
          ],
        });

      const res = await controller.createQuestion(createQuestion, request);

      expect(res).toBeDefined();
      expect(res).toEqual('Sample question');
    });
  });

  describe('createAnswer', () => {
    it('should create a answer', async () => {
      const CreatAnswer: CreatAnswerDto = {
        question: 'qustion',
        answer: 'answer',
      };

      // OpenAI API 호출을 모의(Mock)화하여 원하는 응답을 반환하도록 설정
      jest
        .spyOn(controller['openAi'].chat.completions, 'create')
        .mockResolvedValue({
          id: 'sample-id', // 이 부분은 실제 API 응답에서 얻어지는 'id' 값입니다.
          created: Date.now(), // 이 부분은 실제 API 응답에서 얻어지는 'created' 값입니다.
          model: 'gpt-3.5-turbo', // 이 부분은 실제 API 응답에서 얻어지는 'model' 값입니다.
          object: 'chat.completion', // 이 부분은 실제 API 응답에서 얻어지는 'object' 값입니다.
          choices: [
            {
              message: {
                role: 'assistant',
                content: 'Sample feedback',
              },
              finish_reason: 'stop',
              index: 0,
            },
          ],
        });

      const res = await controller.creatFeedback(CreatAnswer, response);

      expect(res).toBeDefined();
      expect(res).toEqual('Sample feedback');
    });
  });
});
