import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CareersInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '모집 공고 주소' })
  careeresURL: string;

  @IsNumber()
  @ApiProperty({ type: String, description: '제한 시간' })
  time: number;
}
