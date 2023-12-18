export interface CreateQuestionDto {
  position: string;
  skill: string;
}

export interface CreateQuestionsDto extends CreateQuestionDto {
  readonly firstQuestion: string;
}

export interface CreatAnswerDto {
  readonly question: string;

  readonly answer: string;
}
