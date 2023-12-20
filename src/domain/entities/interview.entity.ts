import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

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
  UrlContents: string;

  @Column({ name: 'URL' })
  URL: string;

  @ManyToOne(() => User, (user) => user.urlInterviews)
  @JoinColumn()
  user: User;
}

@Entity()
export class CustomInterviews extends InterviewBase {
  @Column()
  skill: string;

  @Column()
  position: string;

  @ManyToOne(() => User, (user) => user.customInterviews)
  @JoinColumn()
  user: User;
}
