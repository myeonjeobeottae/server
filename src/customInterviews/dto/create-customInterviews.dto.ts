import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CustomInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '직무' })
  position: string;

  @IsString()
  @ApiProperty({ type: String, description: '기술' })
  skill: string;

  @IsNumber()
  @ApiProperty({ type: String, description: '제한 시간' })
  time: number;
}
