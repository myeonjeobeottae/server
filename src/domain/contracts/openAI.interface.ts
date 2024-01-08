import { UrlContents } from '../value-objects/interview/url-interview.vo';
import {
  Question,
  CreateCustomInterviewQuestionInfo,
  CreateFeedbackInfo,
} from '../value-objects/question/custom-question.vo';

export interface IOpenAIService {
  createCustomInterviewQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<Question>;
  createQuestionFeedback(
    createFeedbackInfo: CreateFeedbackInfo,
  ): Promise<string>;
  createUrlInterviewQuestion(urlContents: UrlContents): Promise<Question>;
}
