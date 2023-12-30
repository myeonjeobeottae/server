import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CompletCustomQuestionDto {
  @IsNumber()
  @ApiProperty({ type: String, description: '문제ID' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: '문제' })
  question: string;

  @IsNumber()
  @ApiProperty({ type: String, description: '인터뷰 ID' })
  interviewId: number;
}
