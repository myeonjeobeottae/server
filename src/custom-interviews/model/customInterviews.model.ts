import { Auth } from 'src/auth/entities/auth.entity';

export interface InterviewInfo {
  position: string;
  skill: string;
  time: number;
}

export interface CustomInterviewInfo extends InterviewInfo {
  userKakaoId: string;
}

export interface SaveCustomInterviewInfo extends InterviewInfo {
  user: Auth;
}
