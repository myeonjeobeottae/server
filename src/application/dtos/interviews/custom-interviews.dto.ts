import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCustomInterviewDto {
  @IsString()
  @ApiProperty({ type: String, description: '직무' })
  position: string;

  @IsString()
  @ApiProperty({ type: String, description: '기술' })
  stack: string;

  @IsString()
  @ApiProperty({ type: String, description: '제한 시간' })
  time: string;
}

export class CustomInterviewDto extends CreateCustomInterviewDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: '인터뷰 ID' })
  id: number;
}
