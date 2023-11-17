import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: '포지션' })
  readonly position: string;

  @IsString()
  @ApiProperty({ type: String, description: '기술' })
  readonly skill: string;
}

export class CreateQuestionsDto extends CreateQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: '첫번째 문제' })
  readonly firstQuestion: string;
}

export class CreatAnswerDto {
  @IsString()
  readonly question: string;

  @IsString()
  readonly answer: string;
}
