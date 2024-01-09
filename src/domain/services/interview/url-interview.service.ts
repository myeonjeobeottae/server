import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { UrlInterviewRepository } from 'src/domain/repositories/interview/url-interview.repository';
import {
  CompanyName,
  CreateUrlInterviewInfo,
  FindUrlInterview,
  SaveUrlInterviewInfo,
  UrlContents,
  UrlContentsInfo,
  UrlInterviewInstance,
  UrlValue,
} from 'src/domain/value-objects/interview/url-interview.vo';
import { EntityManager } from 'typeorm';
import Cheerio from 'cheerio';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  FindOneInterview,
  InterviewId,
  Time,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import {
  FindInterviewOfQuestion,
  Question,
  QuestionId,
} from 'src/domain/value-objects/question/custom-question.vo';

@Injectable()
export class UrlInterviewsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('UrlInterviewRepository')
    private urlInterviewRepository: UrlInterviewRepository,
  ) {}

  async createUrlInterview(
    createUrlInterviewInfo: CreateUrlInterviewInfo,
    entityManager?: EntityManager,
  ): Promise<UrlInterviewInstance> {
    const urlDescription = await this.urlDescription(
      createUrlInterviewInfo.getUrlValue(),
    );

    const createUrlInterview =
      await this.urlInterviewRepository.createUrlInterview(
        new SaveUrlInterviewInfo(
          urlDescription.getCompanyName(),
          urlDescription.getUrlContents(),
          createUrlInterviewInfo.getUser(),
          createUrlInterviewInfo.getUrlValue(),
          createUrlInterviewInfo.getTime(),
        ),
        entityManager,
      );

    return new UrlInterviewInstance(createUrlInterview);
  }

  private urlPathSegments(urlValue: UrlValue) {
    const url = new URL(urlValue.getValue());
    const pathSegments = url.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();
    return id;
  }

  private async urlAnalysis(urlValue: UrlValue): Promise<string> {
    const getHtml = await this.httpService.axiosRef.get(urlValue.getValue());
    const $ = Cheerio.load(getHtml.data);
    const companyJobPostings = $('#__NEXT_DATA__').html();

    return companyJobPostings;
  }

  private async urlDescription(urlValue: UrlValue): Promise<UrlContentsInfo> {
    const id = this.urlPathSegments(urlValue);

    const companyJobPostings = await this.urlAnalysis(urlValue);
    const parsingCompanyJobPostings = JSON.parse(companyJobPostings);
    const jobDescription =
      parsingCompanyJobPostings.props.pageProps.head[id].jd;

    const sliceIndex = jobDescription.indexOf('혜택 및 복지');

    const urlContents = jobDescription.slice(0, sliceIndex);

    const companyName =
      parsingCompanyJobPostings.props.pageProps.head[id].company_name;

    const careersInterviewInfo = new UrlContentsInfo(
      new CompanyName(companyName),
      new UrlContents(urlContents),
    );

    return careersInterviewInfo;
  }

  async findUserUrlInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<UrlInterviewInstance[]> {
    const findUserUrlInterviews =
      await this.urlInterviewRepository.findUserUrlInterviews(userKakaoId);

    const userUrlInterviews = findUserUrlInterviews.map((urlInterview) => {
      return new UrlInterviewInstance(urlInterview);
    });

    return userUrlInterviews;
  }

  async findOneUrlInterview(
    findOneInterview: FindOneInterview,
  ): Promise<FindUrlInterview> {
    const findUrlInterview =
      await this.urlInterviewRepository.findOneUrlomInterview(findOneInterview);

    const findUrlInterviewOfQuestions = findUrlInterview.question.map(
      (question) => {
        return new FindInterviewOfQuestion(
          new QuestionId(question.id),
          new Question(question.question),
        );
      },
    );

    const urlInterview = new FindUrlInterview(
      new InterviewId(findUrlInterview.id),
      new CompanyName(findUrlInterview.companyName),
      new UrlContents(findUrlInterview.urlContents),
      new UrlValue(findUrlInterview.URL),
      new Time(findUrlInterview.time),
      findUrlInterviewOfQuestions,
    );
    return urlInterview;
  }

  async deleteUrlInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const deleteUrlInterview =
      await this.urlInterviewRepository.deleteUrlInterview(findOneInterview);
    return deleteUrlInterview;
  }
}
