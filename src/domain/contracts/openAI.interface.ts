import {
  Question,
  CreateCustomInterviewQuestionInfo,
} from '../value-objects/question.vo';

export interface IOpenAIService {
  createCustomInterviewQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<Question>;
  // createQuestionFeedback(
  //   questionFeedbackInfo: QuestionFeedbackInfo,
  // ): Promise<any>;
  // createUrlInterviewQuestion(jobDescription: string): Promise<any>;
}
