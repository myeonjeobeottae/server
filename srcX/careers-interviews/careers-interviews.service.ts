import { Injectable } from '@nestjs/common';
import { CareersInterviews } from './entities/careers-interview.entity';
import { HttpService } from '@nestjs/axios';
import {
  CareersInterviewInfo,
  SaveCareersInterviewInfo,
} from './model/careers-interviews.model';
import Cheerio from 'cheerio';
import { CareersInterviewDto } from './dto/create-careers-interview.dto';
import { CareersInterviewRepository } from './careers-interview.repository';
@Injectable()
export class CareersInterviewsService {
  constructor(
    private careersInterviewRepository: CareersInterviewRepository,
    private readonly httpService: HttpService,
  ) {}
  private urlPathSegments(careersUrl: string) {
    const CareersUrl = new URL(careersUrl);
    const pathSegments = CareersUrl.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();
    return id;
  }

  async careersUrlAnalysis(careersUrl: string): Promise<string> {
    const getHtml = await this.httpService.axiosRef.get(careersUrl);
    const $ = Cheerio.load(getHtml.data);
    const companyJobPostings = $('#__NEXT_DATA__').html();

    return companyJobPostings;
  }

  async careersUrljobDescription(
    careersUrl: string,
  ): Promise<CareersInterviewInfo> {
    const id = this.urlPathSegments(careersUrl);

    const companyJobPostings = await this.careersUrlAnalysis(careersUrl);
    const parsingCompanyJobPostings = JSON.parse(companyJobPostings);
    const jobDescription =
      parsingCompanyJobPostings.props.pageProps.head[id].jd;

    const sliceIndex = jobDescription.indexOf('혜택 및 복지');

    const careersContents = jobDescription.slice(0, sliceIndex);

    const companyName =
      parsingCompanyJobPostings.props.pageProps.head[id].company_name;

    const careersInterviewInfo: CareersInterviewInfo = {
      companyName,
      careersContents,
    };

    return careersInterviewInfo;
  }

  async saveInterview(
    saveCareersInterviewInfo: SaveCareersInterviewInfo,
  ): Promise<CareersInterviewDto> {
    const saveInterview = await this.careersInterviewRepository.saveInterview(
      saveCareersInterviewInfo,
    );
    return saveInterview;
  }

  async careersContentsRemoveSpace(
    careersInterviewDto: CareersInterviewDto,
    kakaoId: string,
  ): Promise<string> {
    const { careersURL, time } = careersInterviewDto;
    const careersInterviewInfo = await this.careersUrljobDescription(
      careersURL,
    );
    const saveCareersInterviewInfo: SaveCareersInterviewInfo = {
      ...careersInterviewInfo,
      careersURL,
      time,
      userKakaoId: kakaoId,
    };
    await this.saveInterview(saveCareersInterviewInfo);

    const careersContentsRemoveSpaces =
      careersInterviewInfo.careersContents.replace(/\s+/g, '');

    return careersContentsRemoveSpaces;
  }

  async findAll(kakaoId: string): Promise<CareersInterviews[]> {
    const findAllInterviews = await this.careersInterviewRepository.findAll(
      kakaoId,
    );
    return findAllInterviews;
  }
}
