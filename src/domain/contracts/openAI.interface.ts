import {
  Question,
  CreateCustomInterviewQuestionInfo,
  CreateFeedbackInfo,
} from '../value-objects/question.vo';

export interface IOpenAIService {
  createCustomInterviewQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<Question>;
  createQuestionFeedback(createFeedbackInfo: CreateFeedbackInfo): Promise<any>;
  // createUrlInterviewQuestion(jobDescription: string): Promise<any>;
}
