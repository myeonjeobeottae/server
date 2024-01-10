import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  CustomInterviewInstance,
  InterviewId,
  Position,
  Stack,
} from '../interview/custom-interview.vo';
import { CustomInterviewQuestion } from '../../entities/question.entity';

export class Question {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('문제가 생성되지 않았습니다.');
    }
  }
  getValue() {
    return this.value;
  }

  equals(other: Question): boolean {
    const equals = this.value === other.getValue();

    return equals;
  }
}

export class QuestionId {
  constructor(private readonly value: number) {
    if (!value) {
      throw new Error('Question ID 가 없습니다.');
    }
  }
  getValue() {
    return this.value;
  }
}

export class Answer {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('답변이 없습니다.');
    }
  }
  getValue() {
    return this.value;
  }
}

export class Feedback {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('피드백이 없습니다.');
    }
  }
  getValue() {
    return this.value;
  }
}

export class OpenAIQuestion {
  constructor(private readonly value: Array<string>) {
    const duplicateCheck = [...new Set(value)];

    if (duplicateCheck.length < 10) {
      throw new Error('10개의 문제가 생성되지 않았습니다.');
    }

    this.value = duplicateCheck;
  }

  static questionReplace(question: string): OpenAIQuestion {
    const linesWithoutNumbers = question.replace(/^\d+\.\s+/gm, '');
    const questionsArray = linesWithoutNumbers.split('\n');

    return new OpenAIQuestion(questionsArray);
  }

  getValue() {
    return this.value;
  }
}

export class CustomInterviewQuestionInstance {
  constructor(private readonly value: CustomInterviewQuestion) {
    if (!value) {
      throw new Error('문제가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class CreateCustomInterviewQuestionInfo {
  constructor(
    private readonly position: Position,
    private readonly stack: Stack,
    private readonly customInterviewInstance: CustomInterviewInstance,
  ) {}

  getPosition() {
    return this.position;
  }

  getStack() {
    return this.stack;
  }

  getCustomInterviewInstance() {
    return this.customInterviewInstance;
  }
}

export class SaveQuestionInfo {
  constructor(
    private readonly question: Question,
    private readonly customInterviewInstance: CustomInterviewInstance,
  ) {}

  getquestion() {
    return this.question;
  }

  getCustomInterviewInstance() {
    return this.customInterviewInstance;
  }
}

export class CompletSaveQuestion {
  constructor(
    private readonly question: Question,
    private readonly interviewId: InterviewId,
  ) {}

  getquestion() {
    return this.question;
  }

  getInterviewId() {
    return this.interviewId;
  }
}

export class FindInterviewOfQuestion {
  constructor(
    private readonly questionId: QuestionId,
    private readonly question: Question,
  ) {}

  getQuestion() {
    return this.question;
  }

  getQuestionId() {
    return this.questionId;
  }
}

export class FindOneInterviewQuestion extends FindInterviewOfQuestion {
  constructor(
    questionId: QuestionId,
    question: Question,
    private readonly answer: Answer,
    private readonly feedback: Feedback,
    private readonly interviewId: InterviewId,
  ) {
    super(questionId, question);
  }

  getAnswer() {
    return this.answer;
  }

  getFeedback() {
    return this.feedback;
  }

  getInterviewId() {
    return this.interviewId;
  }
}

export class FindQuestion {
  constructor(
    private readonly questionId: QuestionId,
    private readonly userKakaoId: UserKakaoId,
  ) {}
  getQuestionId() {
    return this.questionId;
  }

  getUserKakaoId() {
    return this.userKakaoId;
  }
}

export class SaveQuestionAnswer {
  constructor(
    private readonly questionId: QuestionId,
    private readonly answer: Answer,
  ) {}
  getQuestionId() {
    return this.questionId;
  }

  getAnswer() {
    return this.answer;
  }
}

export class CreateFeedbackInfo {
  constructor(
    private readonly question: Question,
    private readonly answer: Answer,
  ) {}

  getQuestion() {
    return this.question;
  }

  getAnswer() {
    return this.answer;
  }
}

export class SaveAnswerFeedbackInfo {
  constructor(
    private readonly questionId: QuestionId,
    private readonly answer: Answer,
    private readonly feedback: Feedback,
  ) {}

  getQuestionId() {
    return this.questionId;
  }

  getFeedback() {
    return this.feedback;
  }

  getAnswer() {
    return this.answer;
  }
}
