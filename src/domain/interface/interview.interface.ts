import { UserInfo } from './user.interface';

export interface InterviewInfo {
  position: string;
  skill: string;
  time: string;
}

export interface CustomInterviewInfo extends InterviewInfo {
  userKakaoId: string;
}

export interface CreateCustomInterviewInfo extends InterviewInfo {
  user: UserInfo;
}
