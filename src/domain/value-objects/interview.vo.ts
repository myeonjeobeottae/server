import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserInfo, UserInstance, UserKakaoId } from './user.vo';
import { User } from '../entities/user.entity';
import { CustomInterviews } from '../entities/interview.entity';

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
  constructor(private readonly value: CustomInterviews) {}

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
