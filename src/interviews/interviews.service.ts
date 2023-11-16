import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UrlInfo, interviewInfo } from './model/interviews.model';
import { Repository } from 'typeorm';
import { Interviews } from './entities/interview.entity';
import { CreateQuestionDto } from 'src/gpt-chat/dto/create-gpt-chat.dto';
import Cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class InterviewsService {
  constructor(
    @Inject('INTERVIEW_REPOSITORY')
    private interviewRepository: Repository<Interviews>,
    private readonly httpService: HttpService,
  ) {}

  async saveInterview(
    createQuestionDto: CreateQuestionDto,
    kakaoId: string,
  ): Promise<CreateInterviewDto> {
    const { position, skill, time } = createQuestionDto;
    const interview = this.interviewRepository.create({
      userKakaoId: kakaoId,
      position,
      skill,
      time,
    });
    const saveInterview = await this.interviewRepository.save(interview);
    return saveInterview;
  }

  async findAll(kakaoId: string): Promise<CreateInterviewDto[]> {
    const findAllInterview = await this.interviewRepository.find({
      where: {
        userKakaoId: kakaoId,
      },
    });
    return findAllInterview;
  }

  async wantedGetHtml(url: UrlInfo): Promise<string> {
    const { wantedUrl } = url;
    const WantedUrl = new URL(wantedUrl);
    const pathSegments = WantedUrl.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();

    const getHtml = await this.httpService.axiosRef.get(wantedUrl);
    const $ = Cheerio.load(getHtml.data);

    const companyJobPostings = $('#__NEXT_DATA__').html();

    const parsingCompanyJobPostings = JSON.parse(companyJobPostings);
    const jobDescription =
      parsingCompanyJobPostings.props.pageProps.head[id].jd;
    const sliceIndex = jobDescription.indexOf('혜택 및 복지');
    const sliceJobDescription = jobDescription.slice(0, sliceIndex);

    const jobDescriptionRemoveSpaces = sliceJobDescription.replace(/\s+/g, '');

    return jobDescriptionRemoveSpaces;
  }
}
