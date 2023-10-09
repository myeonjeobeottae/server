import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '사용자 ID' })
  userKakaoId: string;

  @IsString()
  @ApiProperty({ type: String, description: '직무' })
  position: string;

  @IsString()
  @ApiProperty({ type: String, description: '기술' })
  skill: string;
}

// export class CreateQuestionDto {
//   userkakoId: string;
//   question: string;
//   answer: string;
//   feedback: string;
// }
