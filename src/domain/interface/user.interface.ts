export interface UserInfo {
  refreshToken?: string;
  nickname: string;
  image: string;
}

export interface UserData extends UserInfo {
  accessToken: string;
}

export interface UserKakaoInfo extends UserInfo {
  //   id: number;
  userKakaoId: string;
  email: string;
  //   customInterviews: CustomInterviews[];
}
