import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
  CustomInterviewQuestion,
  Question,
  UrlInterviewQuestion,
} from './question.entity';

export abstract class InterviewBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;
}

@Entity()
export class UrlInterviews extends InterviewBase {
  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'url_contents', type: 'text' })
  urlContents: string;

  @Column({ name: 'URL' })
  URL: string;

  @ManyToOne(() => User, (user) => user.urlInterviews)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(
    () => UrlInterviewQuestion,
    (urlInterviewQuestion) => urlInterviewQuestion.interview,
    {
      eager: false,
    },
  )
  question: UrlInterviewQuestion[];
}

@Entity()
export class CustomInterviews extends InterviewBase {
  @Column()
  stack: string;

  @Column()
  position: string;

  @ManyToOne(() => User, (user) => user.customInterviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(
    () => CustomInterviewQuestion,
    (customInterviewQuestion) => customInterviewQuestion.interview,
    {
      eager: false,
    },
  )
  question: CustomInterviewQuestion[];
}
