import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { FindInterviewOfQuestionDto } from '../question/question.dto';

export class CreateUrlInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '원티드 채용공고 URL' })
  URL: string;

  @IsString()
  @ApiProperty({ type: String, description: '제한 시간' })
  time: string;
}

export class UrlinterviewDto extends CreateUrlInterviewDto {
  @IsNumber()
  @ApiProperty({ type: String, description: 'URL 인터뷰 ID' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: '원티드 채용공고 URL 회사명' })
  companyName: string;

  @IsString()
  @ApiProperty({ type: String, description: '원티드 채용공고 URL 모집공고' })
  urlContents: string;
}

export class FindUrlInterviewDto extends UrlinterviewDto {
  @IsArray()
  @ApiProperty({ type: Number, description: '인터뷰에 포함된 문제들' })
  question: FindInterviewOfQuestionDto[];
}
