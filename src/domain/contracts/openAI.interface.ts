import {
  CreateCustomInterviewQuestionInfo,
  QuestionFeedbackInfo,
} from '../interface/question.interface';
export interface IOpenAIService {
  createCustomInterviewQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<any>;
  createQuestionFeedback(
    questionFeedbackInfo: QuestionFeedbackInfo,
  ): Promise<any>;
  createUrlInterviewQuestion(jobDescription: string): Promise<any>;
}
