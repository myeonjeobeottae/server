import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  CreateCustomInterviewQuestionInfo,
  QuestionFeedbackInfo,
  CompletContent,
} from 'src/domain/interface/question.interface';
import { IOpenAIService } from '../../../domain/contracts/openAI.interface';

@Injectable()
export class OpenAIService implements IOpenAIService {
  constructor(
    @Inject('OpenAI')
    private readonly openAI: OpenAI,
  ) {}

  private async openAICreateQuestion(content: string): Promise<any> {
    const createQuestion = await this.openAI.chat.completions.create({
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

  private async openAIChatStream(content: string): Promise<any> {
    const completion = await this.openAI.chat.completions.create({
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

  async createCustomInterviewQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<CompletContent> {
    const { position, stack } = createCustomInterviewQuestionInfo;
    const content = `${position} ${stack} 면접 질문 1개 만들어줘 `;
    const complet = await this.openAICreateQuestion(content);
    return complet;
  }

  //   async createQuestions(createQuestionsDto: CreateQuestionsDto): Promise<any> {
  //     const { firstQuestion, position, stack } = createQuestionsDto;
  //     const content = `${position} ${stack}면접 질문 다시 9개 만들어주는데 ${firstQuestion}. 를 제외한 질문 만들어줘  `;
  //     const complet = await this.openAICreateQuestion(content);
  //     return complet;
  //   }

  async createQuestionFeedback(
    questionFeedbackInfo: QuestionFeedbackInfo,
  ): Promise<any> {
    const { question, answer } = questionFeedbackInfo;

    const content = `문제:${question} 답변:${answer} 답변에 내용을 틀린점이 있으면 알려주고 부족한 점을 보안해줘`;
    const complet = await this.openAIChatStream(content);
    return complet;
  }

  async createUrlInterviewQuestion(
    jobDescription: string,
  ): Promise<CompletContent> {
    const content = `너는 "${jobDescription}" 이 채용 공고의 회사 면접관이고 나는 면접자인데 면접관이 면접자에게 할 수 있는 기술적 역량 관련 질문 하나만 만들어서 질문 만 알려줘 `;
    const complet = await this.openAICreateQuestion(content);
    return complet;
  }
}
