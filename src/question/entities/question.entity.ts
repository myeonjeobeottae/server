import { Interviews } from '../../interviews/entities/interview.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
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

  @Column({ name: 'posting_URL' })
  postingUrl: string;

  @Column()
  type: string;
}
