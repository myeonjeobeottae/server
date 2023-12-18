export class UserInfo {
  readonly userKakaoId: string;
  readonly email?: string;
  readonly nickname: string;
  readonly image: string;
  constructor(
    userKakaoId: string,
    nickname: string,
    image: string,
    email?: string,
  ) {
    this.userKakaoId = userKakaoId;
    this.email = email;
    this.nickname = nickname;
    this.image = image;
  }
}

export class UserKakaoInfo extends UserInfo {
  readonly id: number;
  constructor(
    id: number,
    userKakaoId: string,
    email: string,
    nickname: string,
    image: string,
  ) {
    // 여기에 유효성 검증 로직을 추가할 수 있습니다.
    super(userKakaoId, nickname, image, email);
    this.id = id;
  }

  // 필요한 경우 equals 메서드 등 추가 로직 구현
}
