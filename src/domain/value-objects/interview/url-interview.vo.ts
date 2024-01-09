import { FindInterviewOfQuestion } from './../question/custom-question.vo';
import { InterviewId } from 'src/domain/value-objects/interview/custom-interview.vo';
import { UserInstance, UserKakaoId } from 'src/domain/value-objects/user.vo';
import { Time } from './custom-interview.vo';
import { UrlInterviews } from 'src/domain/entities/interview.entity';

export class UrlValue {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('URL이 없습니다.');
    }
    try {
      new URL(value);
      this.value = value;
    } catch (error) {
      throw new Error('유효하지 않은 URL 형식입니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class CompanyName {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('회사명이 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class UrlContents {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('URL Content가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class UrlInterviewInstance {
  constructor(private readonly value: UrlInterviews) {
    if (!value) {
      throw new Error('URL 인터뷰가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class UrlInterview {
  constructor(
    private readonly urlValue: UrlValue,
    private readonly time: Time,
  ) {}

  getUrlValue() {
    return this.urlValue;
  }

  getTime() {
    return this.time;
  }
}

export class UrlInterviewInfo extends UrlInterview {
  constructor(
    private readonly userKakaoId: UserKakaoId,
    urlValue: UrlValue,
    time: Time,
  ) {
    super(urlValue, time);
  }

  getUserKakaoId() {
    return this.userKakaoId;
  }
}

export class CreateUrlInterviewInfo extends UrlInterview {
  constructor(
    private readonly user: UserInstance,
    urlValue: UrlValue,
    time: Time,
  ) {
    super(urlValue, time);
  }

  getUser() {
    return this.user;
  }
}

export class UrlContentsInfo {
  constructor(
    private readonly companyName: CompanyName,
    private readonly urlContents: UrlContents,
  ) {}

  getCompanyName() {
    return this.companyName;
  }

  getUrlContents() {
    return this.urlContents;
  }
}

export class SaveUrlInterviewInfo extends CreateUrlInterviewInfo {
  constructor(
    private readonly companyName: CompanyName,
    private readonly urlContent: UrlContents,
    user: UserInstance,
    urlValue: UrlValue,
    time: Time,
  ) {
    super(user, urlValue, time);
  }
  getCompanyName() {
    return this.companyName;
  }

  getUrlContent() {
    return this.urlContent;
  }
}

export class FindUrlInterview extends UrlContentsInfo {
  constructor(
    private readonly interviewId: InterviewId,
    companyName: CompanyName,
    urlContent: UrlContents,
    private readonly urlValue: UrlValue,
    private readonly time: Time,
    private readonly findUrlInterviewOfQuestion: FindInterviewOfQuestion[],
  ) {
    super(companyName, urlContent);
    if (findUrlInterviewOfQuestion.length > 10) {
      throw new Error('문제를 10개 이상 찾았습니다.확인 요망');
    }
  }
  getInterviewId() {
    return this.interviewId;
  }

  getUrlValue() {
    return this.urlValue;
  }

  getTime() {
    return this.time;
  }

  getFindUrlInterviewOfQuestion() {
    return this.findUrlInterviewOfQuestion;
  }
}
