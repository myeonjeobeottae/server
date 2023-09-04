import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateQuestionDto {
  @IsString()
  readonly position: string;
  @IsString()
  readonly skill: string;

  @IsNumber()
  Timeouts?: number;
}
