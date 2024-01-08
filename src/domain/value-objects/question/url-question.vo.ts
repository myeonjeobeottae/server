import { UrlInterviewInstance } from '../interview/url-interview.vo';
import { Question } from './custom-question.vo';

export class SaveUrlQuestionInfo {
  constructor(
    private readonly question: Question,
    private readonly urlInterviewInstance: UrlInterviewInstance,
  ) {}

  getquestion() {
    return this.question;
  }

  getCustomInterviewInstance() {
    return this.urlInterviewInstance;
  }
}
