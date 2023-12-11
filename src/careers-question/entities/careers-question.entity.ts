import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CareersQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'interview_id' })
  interviewId: number;

  @Column({ name: 'user_id' })
  userKakaoId: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  feedback: string;
}
