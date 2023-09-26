import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class KakaoUserDto {
  @IsString()
  @ApiProperty({ type: String, description: '이메일' })
  readonly email?: string;

  @IsString()
  @ApiProperty({ type: String, description: '사용자 카카오 ID' })
  readonly userKaKaoId: string;

  @IsString()
  @ApiProperty({ type: String, description: '사용자 프로필 이미지' })
  readonly image: string;

  @IsString()
  @ApiProperty({ type: String, description: '사용자 닉네임' })
  readonly nickname: string;

  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly refreshToken: string;
}

export class KakaoLoginAuthOutputDto {}
