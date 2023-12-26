import {
  CreateCustomInterviewInfo,
  InterviewInfo,
} from './interview.interface';

export interface CreateCustomInterviewQuestionInfo {
  position: string;
  stack: string;
}

export interface QuestionFeedbackInfo {
  question: string;
  answer: string;
}

export interface CompletContent {
  content: string;
}

export interface SaveQuestionInfo extends CompletContent {
  interview: InterviewInfo;
}

export interface CompletSaveQuestion extends QuestionFeedbackInfo {
  id: number;
  interview: number;
  feedback: string;
}
