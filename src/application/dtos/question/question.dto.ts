import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindInterviewOfQuestionDto {
  @IsNumber()
  @ApiProperty({ type: String, description: '문제ID' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: '문제' })
  question: string;
}

export class CompletQuestionDto extends FindInterviewOfQuestionDto {
  @IsNumber()
  @ApiProperty({ type: String, description: '인터뷰 ID' })
  interviewId: number;
}

export class CreateFeedbackDto {
  @IsString()
  @ApiProperty({ type: String, description: '문제' })
  question: string;

  @IsString()
  @ApiProperty({ type: String, description: '답변' })
  answer: string;
}

export class SaveAnswerFeedbackDto {
  @IsString()
  @ApiProperty({ type: String, description: '답변' })
  answer: string;

  @IsString()
  @ApiProperty({ type: String, description: '피드백' })
  feedback: string;
}

export class FindOneQuestionDto extends FindInterviewOfQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: '답변' })
  answer: string;

  @IsString()
  @ApiProperty({ type: String, description: '피드백' })
  feedback: string;

  @IsNumber()
  @ApiProperty({ type: String, description: '인터뷰 ID' })
  interviewId: number;
}
