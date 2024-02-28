import { UrlInterviewQuestionService } from './../../../domain/services/question/url-interview-question.service';
import { UrlInterviewsService } from './../../../domain/services/interview/url-interview.service';
import {
  CreateUrlInterviewInfo,
  UrlContents,
  UrlInterviewInfo,
} from './../../../domain/value-objects/interview/url-interview.vo';
import { DataSource } from 'typeorm';
import { UserService } from 'src/domain/services/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.interface';

import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { CustomInterviewQuestionService } from 'src/domain/services/question/custom-interview-question.service';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  FindOneInterview,
} from 'src/domain/value-objects/interview/custom-interview.vo';

import {
  CompletQuestionDto,
  FindInterviewOfQuestionDto,
} from 'src/application/dtos/question/question.dto';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import {
  CustomInterviewDto,
  FindCustomInterviewDto,
} from 'src/application/dtos/interviews/custom-interviews.dto';
import {
  CreateCustomInterviewQuestionInfo,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { SaveUrlQuestionInfo } from 'src/domain/value-objects/question/url-question.vo';
import {
  FindUrlInterviewDto,
  UrlinterviewDto,
} from 'src/application/dtos/interviews/url-interviews.dto';

@Injectable()
export class InterviewsService implements IInterviewService {
  constructor(
    private readonly userService: UserService,
    private readonly customInterviewsService: CustomInterviewsService,
    private readonly urlInterviewsService: UrlInterviewsService,
    private readonly customInterviewQuestionService: CustomInterviewQuestionService,
    private readonly urlInterviewQuestionService: UrlInterviewQuestionService,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async createCustomInterview(
    customInterviewInfo: CustomInterviewInfo,
  ): Promise<CompletQuestionDto[]> {
    return await this.dataSource.transaction(async (entityManager) => {
      const findUser = await this.userService.findUser(
        customInterviewInfo.getUserKakaoId(),
      );
      const saveInterview =
        await this.customInterviewsService.createCustomInterview(
          new CreateCustomInterviewInfo(
            customInterviewInfo.getPosition(),
            customInterviewInfo.getStack(),
            customInterviewInfo.getTime(),
            findUser,
          ),
          entityManager,
        );

      const createQuestion =
        await this.customInterviewQuestionService.createQuestion(
          new CreateCustomInterviewQuestionInfo(
            customInterviewInfo.getPosition(),
            customInterviewInfo.getStack(),
            saveInterview,
          ),
          entityManager,
        );

      return createQuestion;
    });
  }

  async createUrlInterview(
    urlInterviewInfo: UrlInterviewInfo,
  ): Promise<CompletQuestionDto[]> {
    return await this.dataSource.transaction(async (entityManager) => {
      const findUser = await this.userService.findUser(
        urlInterviewInfo.getUserKakaoId(),
      );

      const saveInterview = await this.urlInterviewsService.createUrlInterview(
        new CreateUrlInterviewInfo(
          findUser,
          urlInterviewInfo.getUrlValue(),
          urlInterviewInfo.getTime(),
        ),
        entityManager,
      );

      const createQuestion =
        await this.urlInterviewQuestionService.createQuestion(
          new UrlContents(saveInterview.getValue().urlContents),
        );

      const saveQuestions = await this.urlInterviewQuestionService.saveQuestion(
        new SaveUrlQuestionInfo(createQuestion, saveInterview),
        entityManager,
      );

      return saveQuestions;
    });
  }

  async findUserCustomInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<CustomInterviewDto[]> {
    const findUserCustomInterviews =
      await this.customInterviewsService.findUserCustomInterviews(userKakaoId);

    const userCustomInterviews = findUserCustomInterviews.map(
      (customInterview) => {
        return customInterview.getValue();
      },
    );
    return userCustomInterviews;
  }

  async findUserUrlInterviews(
    userKakaoId: UserKakaoId,
  ): Promise<UrlinterviewDto[]> {
    const findUserUrlInterviews =
      await this.urlInterviewsService.findUserUrlInterviews(userKakaoId);

    const userUrlInterviews = findUserUrlInterviews.map((urlInterview) => {
      return urlInterview.getValue();
    });

    return userUrlInterviews;
  }

  async findOneCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<FindCustomInterviewDto> {
    const findUserCustomInterviews =
      await this.customInterviewsService.findOneCustomInterview(
        findOneInterview,
      );

    const findUserCustomInterviewOfQuestion = findUserCustomInterviews
      .getFindCustomInterviewOfQuestion()
      .map((qusetion) => {
        const CompletQuestionDto: FindInterviewOfQuestionDto = {
          id: qusetion.getQuestionId().getValue(),
          question: qusetion.getQuestion().getValue(),
        };
        return CompletQuestionDto;
      });

    const customInterviews: FindCustomInterviewDto = {
      id: findUserCustomInterviews.getInterviewId().getValue(),
      stack: findUserCustomInterviews.getStack().getValue(),
      position: findUserCustomInterviews.getPosition().getValue(),
      time: findUserCustomInterviews.getTime().getValue(),
      question: findUserCustomInterviewOfQuestion,
    };

    return customInterviews;
  }

  async findOneUrlomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<FindUrlInterviewDto> {
    const findUserurlInterviews =
      await this.urlInterviewsService.findOneUrlInterview(findOneInterview);

    const findUserUrlInterviewOfQuestion = findUserurlInterviews
      .getFindUrlInterviewOfQuestion()
      .map((qusetion) => {
        const CompletQuestionDto: FindInterviewOfQuestionDto = {
          id: qusetion.getQuestionId().getValue(),
          question: qusetion.getQuestion().getValue(),
        };
        return CompletQuestionDto;
      });

    const urlInterviews: FindUrlInterviewDto = {
      id: findUserurlInterviews.getInterviewId().getValue(),
      companyName: findUserurlInterviews.getCompanyName().getValue(),
      URL: findUserurlInterviews.getUrlValue().getValue(),
      urlContents: findUserurlInterviews.getUrlContents().getValue(),
      time: findUserurlInterviews.getTime().getValue(),
      question: findUserUrlInterviewOfQuestion,
    };

    return urlInterviews;
  }

  async deleteCustomInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const deleteCustomInterview =
      await this.customInterviewsService.deleteCustomInterview(
        findOneInterview,
      );
    return deleteCustomInterview;
  }

  async deleteUrlInterview(
    findOneInterview: FindOneInterview,
  ): Promise<boolean> {
    const deleteUrlInterview =
      await this.urlInterviewsService.deleteUrlInterview(findOneInterview);
    return deleteUrlInterview;
  }
}
