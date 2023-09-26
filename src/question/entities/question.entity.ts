import { Interviews } from 'src/interviews/entities/interview.entity';
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

  @ManyToOne(() => Interviews)
  @JoinColumn({ name: 'interview_id' })
  interviewId: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  feedback: string;

  @Column()
  time: string;
}
