import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomInterviews, UrlInterviews } from './interview.entity';

export abstract class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ nullable: true, default: 'No answer' })
  answer: string;

  @Column({ nullable: true, default: 'No feedback' })
  feedback: string;
}

@Entity()
export class CustomInterviewQuestion extends Question {
  @ManyToOne(
    () => CustomInterviews,
    (customInterviews) => customInterviews.question,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  interview: CustomInterviews;
}

@Entity()
export class UrlInterviewQuestion extends Question {
  @ManyToOne(() => UrlInterviews, (urlInterviews) => urlInterviews.question)
  @JoinColumn()
  interview: UrlInterviews;
}
