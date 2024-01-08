import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUrlInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '원티드 채용공고 URL' })
  url: string;

  @IsString()
  @ApiProperty({ type: String, description: '제한 시간' })
  time: string;
}
