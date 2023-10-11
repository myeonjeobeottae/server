export interface SaveQuestionInfo {
  interviewId: number;
  userKakaoId: string;
  question: string;
  answer: string;
  feedback: string;
  time: string;
}

export interface FindQuestionsIncludedInTheInterviewInfo {
  interviewId: number;
  userKakaoId: string;
}

export interface FindOneQuestionInfo {
  questionId: number;
  userKakaoId: string;
}
