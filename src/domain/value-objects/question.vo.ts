import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomInterviewInstance, Position, Stack } from './interview.vo';

export class Question {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('문제가 생성되지 않았습니다.');
    }
  }
  getValue() {
    return this.value;
  }
}

export class InterviewId {
  constructor(private readonly value: number) {}
  getValue() {
    return this.value;
  }
}

export class CreateCustomInterviewQuestionInfo {
  constructor(
    private readonly position: Position,
    private readonly stack: Stack,
  ) {}

  getPosition() {
    return this.position;
  }

  getStack() {
    return this.stack;
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
  toPlain() {
    return {
      question: this.question.getValue(), // question 객체에서 실제 값을 가져옵니다.
      interviewId: this.interviewId.getValue(), // interviewId 객체에서 실제 값을 가져옵니다.
    };
  }
}
