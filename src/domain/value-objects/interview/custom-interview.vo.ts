import { UserInstance, UserKakaoId } from '../user.vo';
import { CustomInterviews } from '../../entities/interview.entity';
import { FindInterviewOfQuestion } from '../question/custom-question.vo';

export class InterviewId {
  constructor(private readonly value: number) {
    if (!value) {
      throw new Error('Interview Id가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class Position {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('포지션을 선택하세요.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class Stack {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('기술을 선택하세요.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class Time {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('제한시간을 선택하세요.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class CustomInterviewInstance {
  constructor(private readonly value: CustomInterviews) {
    if (!value) {
      throw new Error('인터뷰가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class InterviewInfo {
  constructor(
    private readonly position: Position,
    private readonly stack: Stack,
    private readonly time: Time,
  ) {}

  getPosition() {
    return this.position;
  }

  getStack() {
    return this.stack;
  }

  getTime() {
    return this.time;
  }
}

export class CustomInterviewInfo extends InterviewInfo {
  constructor(
    position: Position,
    stack: Stack,
    time: Time,
    private readonly userKakaoId: UserKakaoId,
  ) {
    super(position, stack, time);
  }
  getUserKakaoId() {
    return this.userKakaoId;
  }
}

export class CreateCustomInterviewInfo extends InterviewInfo {
  constructor(
    position: Position,
    stack: Stack,
    time: Time,
    private readonly user: UserInstance,
  ) {
    super(position, stack, time);
  }
  getUser() {
    return this.user;
  }
}

export class FindCustomInterview extends InterviewInfo {
  constructor(
    private readonly interviewId: InterviewId,
    position: Position,
    stack: Stack,
    time: Time,
    private readonly findCustomInterviewOfQuestions: FindInterviewOfQuestion[],
  ) {
    super(position, stack, time);
    if (findCustomInterviewOfQuestions.length > 10) {
      throw new Error('문제를 10개 이상 찾았습니다.확인 요망');
    }
  }

  getInterviewId() {
    return this.interviewId;
  }

  getFindCustomInterviewOfQuestion() {
    return this.findCustomInterviewOfQuestions;
  }
}

export class FindOneInterview {
  constructor(
    private readonly interviewId: InterviewId,

    private readonly userKakaoId: UserKakaoId,
  ) {}

  getInterviewId() {
    return this.interviewId;
  }

  getUserKakaoId() {
    return this.userKakaoId;
  }
}
