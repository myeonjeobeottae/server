import { UrlContents } from './../../value-objects/interview/url-interview.vo';
import { Inject, Injectable } from '@nestjs/common';
import { CompletQuestionDto } from 'src/application/dtos/question/custom-question.dto';
import { IOpenAIService } from 'src/domain/contracts/openAI.interface';
import { UrlInterviewQuestionRepository } from 'src/domain/repositories/question/url-interview-question.repository';
import {
  OpenAIQuestion,
  Question,
} from 'src/domain/value-objects/question/custom-question.vo';
import { SaveUrlQuestionInfo } from 'src/domain/value-objects/question/url-question.vo';
import { EntityManager } from 'typeorm';

@Injectable()
export class UrlInterviewQuestionService {
  constructor(
    @Inject('UrlInterviewQuestionRepository')
    private readonly urlInterviewQuestionRepository: UrlInterviewQuestionRepository,
    @Inject('IOpenAIService')
    private readonly openAIService: IOpenAIService,
  ) {}

  async createQuestion(urlContents: UrlContents): Promise<Question> {
    const createQuestion = await this.openAIService.createUrlInterviewQuestion(
      urlContents,
    );
    return createQuestion;
  }

  async saveQuestion(
    saveUrlQuestionInfo: SaveUrlQuestionInfo,
    entityManager?: EntityManager,
  ): Promise<CompletQuestionDto[]> {
    const questionArray = OpenAIQuestion.questionReplace(
      saveUrlQuestionInfo.getquestion().getValue(),
    );

    const urlInterviewInstance =
      saveUrlQuestionInfo.getCustomInterviewInstance();

    const saveQuestion = questionArray.getValue().map(async (question) => {
      const saveUrlQuestionInfo = new SaveUrlQuestionInfo(
        new Question(question),
        urlInterviewInstance,
      );

      const completSave =
        await this.urlInterviewQuestionRepository.saveQuestion(
          saveUrlQuestionInfo,
          entityManager,
        );

      const CompletUrlQuestion: CompletQuestionDto = {
        id: completSave.id,
        question: completSave.question,
        interviewId: completSave.interview.id,
      };

      return CompletUrlQuestion;
    });

    const completSaveQuestion = await Promise.all(saveQuestion);

    const sortCompletSaveQuestion = completSaveQuestion.sort(
      (a, b) => a.id - b.id,
    );

    return sortCompletSaveQuestion;
  }
}
