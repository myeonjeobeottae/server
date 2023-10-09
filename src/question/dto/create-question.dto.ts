import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SaveQuestionDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: '면접 번호' })
  interviewId: number;

  @IsString()
  @ApiProperty({ type: String, description: '문제' })
  question: string;

  @IsString()
  @ApiProperty({ type: String, description: '답변' })
  answer: string;

  @IsString()
  @ApiProperty({ type: String, description: '피드백' })
  feedback: string;

  @IsString()
  @ApiProperty({ type: String, description: '문제당 시간' })
  time: string;
}
