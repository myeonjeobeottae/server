import { IsString } from '@nestjs/class-validator';
export class CreateUserDto {
  @IsString()
  readonly name: string;
}
