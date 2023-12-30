import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';

function isValidImageUrl(url: string): boolean {
  return /^(http|https):\/\/.*\.(jpeg|jpg|gif|png)$/.test(url);
}

export class UserInstance {
  constructor(private readonly value: User) {}

  getValue() {
    return this.value;
  }
}

export class Nickname {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('닉네임이 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class Image {
  constructor(private readonly value: string) {
    if (value === '' || !isValidImageUrl(value)) {
      throw new Error('이미지가 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class AccessToken {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('AccessToken이 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class RefreshToken {
  constructor(private readonly value: string) {
    if (value === '' || !value) {
      throw new Error('RefreshToken이 없습니다.');
    }
  }

  getValue() {
    return this.value;
  }
}

export class UserKakaoId {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error('Kakao ID가 없습니다.');
    }
  }

  getValue(): string {
    return this.value;
  }
}

export class Email {
  constructor(private readonly value: string) {}

  getValue() {
    return this.value;
  }
}

export class UserData {
  constructor(
    private readonly nickname: Nickname,
    private readonly image: Image,
  ) {}

  getNickname() {
    return this.nickname;
  }

  getImage() {
    return this.image;
  }
}

export class UserTokenData extends UserData {
  constructor(
    nickname: Nickname,
    image: Image,
    private readonly accessToken: AccessToken,
    private readonly refreshToken: RefreshToken,
  ) {
    super(nickname, image);
  }
  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }
}

export class CreateUserInfo extends UserData {
  constructor(
    nickname: Nickname,
    image: Image,
    private readonly userKakaoId: UserKakaoId,
    private readonly email: Email,
  ) {
    super(nickname, image);
  }

  getUserKakaoId() {
    return this.userKakaoId;
  }
  getEmail() {
    return this.email;
  }
}

export class UserKakaoInfo extends CreateUserInfo {
  constructor(
    nickname: Nickname,
    image: Image,
    userKakaoId: UserKakaoId,
    email: Email,
    private readonly refreshToken: RefreshToken,
  ) {
    super(nickname, image, userKakaoId, email);
  }
  getRefreshToken() {
    return this.refreshToken;
  }
}
