import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class KakaoUserDto {
  @IsString()
  readonly email?: string;

  @IsString()
  // @Transform(({ value }) => {
  //   return Number(value);
  // })
  readonly userKaKaoId: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly refreshToken: string;
}

export class KakaoLoginAuthOutputDto {}
