import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';

@Injectable()
export class GptChatService {
  constructor(private readonly httpService: HttpService) {}
  create(userId: number) {
    return 'This action adds a new gptChat';
  }

  async wontedGetHtml(url: string): Promise<any> {
    const WontedUrl = new URL(url);
    const pathSegments = WontedUrl.pathname.split('/');
    const id = pathSegments.pop() || pathSegments.pop();

    const getHtml = await this.httpService.axiosRef.get(url);
    const $ = cheerio.load(getHtml.data);

    const companyJobPostings = $('#__NEXT_DATA__').html();

    const parsingCompanyJobPostings = JSON.parse(companyJobPostings);
    const jobDescription =
      parsingCompanyJobPostings.props.pageProps.head[id].jd;
    const jobDescriptionRemoveSpaces = jobDescription.replace(/\s+/g, '');
    return jobDescriptionRemoveSpaces;
  }
}
