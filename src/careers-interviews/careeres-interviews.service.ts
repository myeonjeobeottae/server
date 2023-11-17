import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CareeresInterviews } from './entities/careeres-interview.entity';
import { HttpService } from '@nestjs/axios';
import {
  CareeresInterviewInfo,
  SaveCareeresInterviewInfo,
  UrlInfo,
} from './model/careeres-interviews.model';
import Cheerio from 'cheerio';
import { CareersInterviewDto } from './dto/create-careeres-interview.dto';
@Injectable()
export class CareeresInterviewsService {
  constructor(
    @Inject('CAREERES_INTERVIEW_REPOSITORY')
    private careeresInterviewRepository: Repository<CareeresInterviews>,
    private readonly httpService: HttpService,
  ) {}
  urlPathSegments(careeresUrl: string) {
    const CareeresUrl = new URL(careeresUrl);
    const pathSegments = CareeresUrl.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();
    return id;
  }

  async careeresUrlAnalysis(careeresUrl: string): Promise<string> {
    const getHtml = await this.httpService.axiosRef.get(careeresUrl);
    const $ = Cheerio.load(getHtml.data);
    const companyJobPostings = $('#__NEXT_DATA__').html();

    return companyJobPostings;
  }

  async careeresUrljobDescription(
    careeresUrl: string,
  ): Promise<CareeresInterviewInfo> {
    const id = this.urlPathSegments(careeresUrl);

    const companyJobPostings = await this.careeresUrlAnalysis(careeresUrl);
    const parsingCompanyJobPostings = JSON.parse(companyJobPostings);
    const jobDescription =
      parsingCompanyJobPostings.props.pageProps.head[id].jd;

    const sliceIndex = jobDescription.indexOf('혜택 및 복지');

    const careersContents = jobDescription.slice(0, sliceIndex);

    const companyName =
      parsingCompanyJobPostings.props.pageProps.head[id].company_name;

    const careeresInterviewInfo: CareeresInterviewInfo = {
      companyName,
      careersContents,
    };

    return careeresInterviewInfo;
  }

  async saveInterview(
    saveCareeresInterviewInfo: SaveCareeresInterviewInfo,
  ): Promise<CareersInterviewDto> {
    const { companyName, careersContents, careeresURL, time } =
      saveCareeresInterviewInfo;
    const interview = this.careeresInterviewRepository.create({
      companyName,
      careersContents,
      careeresURL,
      time,
    });
    const saveInterview = await this.careeresInterviewRepository.save(
      interview,
    );
    return saveInterview;
  }

  async careersContentsRemoveSpace(
    careersInterviewDto: CareersInterviewDto,
  ): Promise<string> {
    const { careeresURL, time } = careersInterviewDto;
    const careeresInterviewInfo = await this.careeresUrljobDescription(
      careeresURL,
    );
    const { companyName, careersContents } = careeresInterviewInfo;
    const saveCareeresInterviewInfo: SaveCareeresInterviewInfo = {
      companyName,
      careersContents,
      careeresURL,
      time,
    };
    await this.saveInterview(saveCareeresInterviewInfo);

    const careersContentsRemoveSpaces = careersContents.replace(/\s+/g, '');
    return careersContentsRemoveSpaces;
  }
}
