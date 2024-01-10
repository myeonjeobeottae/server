import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDataDto {
  @IsString()
  @ApiProperty({ type: String, description: '닉네임' })
  nickname: string;

  @IsString()
  @ApiProperty({ type: String, description: '이미지' })
  image: string;
}

export class UserTokenDataDto extends UserDataDto {
  @IsString()
  @ApiProperty({ type: String, description: 'access token' })
  accessToken: string;
}
