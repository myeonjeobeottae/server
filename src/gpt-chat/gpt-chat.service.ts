import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import OpenAI from 'openai';
import {
  CreatAnswerDto,
  CreateQuestionDto,
  CreateQuestionsDto,
} from './dto/create-gpt-chat.dto';

@Injectable()
export class GptChatService {
  constructor(
    @Inject('OpenAi')
    private readonly openAi: OpenAI,
  ) {}

  async openAIChat(content: string): Promise<any> {
    const createQuestion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${content} `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const complet = {
      content: createQuestion.choices[0].message.content,
    };

    return complet;
  }
  async openAIChatStream(content: string): Promise<any> {
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${content}`,
        },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    return completion;
  }

  async createQuestionOne(createQuestionDto: CreateQuestionDto): Promise<any> {
    const { position, skill } = createQuestionDto;
    const content = `${position} ${skill} 면접 질문 1개 만들어줘 `;
    const complet = await this.openAIChat(content);
    return complet;
  }

  async createQuestions(createQuestionsDto: CreateQuestionsDto): Promise<any> {
    const { firstQuestion, position, skill } = createQuestionsDto;
    const content = `${position} ${skill}면접 질문 다시 9개 만들어주는데 ${firstQuestion}. 를 제외한 질문 만들어줘  `;
    const complet = await this.openAIChat(content);
    return complet;
  }

  async createQuestionFeedback(creatAnswer: CreatAnswerDto): Promise<any> {
    const { question, answer } = creatAnswer;

    const content = `문제:${question} 답변:${answer} 답변에 내용을 틀린점이 있으면 알려주고 부족한 점을 보안해줘`;
    const complet = await this.openAIChatStream(content);
    return complet;
  }

  async createQuestionOfURL(jobDescription: string): Promise<any> {
    const content = `너는 "${jobDescription}" 이 채용 공고의 회사 면접관이고 나는 면접자인데 면접관이 면접자에게 할 수 있는 기술적 역량 관련 질문 하나만 만들어서 질문 만 알려줘 `;
    const complet = await this.openAIChat(content);
    return complet;
  }
}
