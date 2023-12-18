import { Auth } from 'src/auth/entities/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomInterviews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auth, (auth) => auth.customInterviews)
  @JoinColumn()
  user: Auth;

  @Column()
  skill: string;

  @Column()
  position: string;

  @Column()
  time: number;
}
