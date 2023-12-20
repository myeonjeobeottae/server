import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  CustomInterviews,
  InterviewBase,
  UrlInterviews,
} from './interview.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'kakao_id' })
  userKakaoId: string;

  @Column()
  nickname: string;

  @Column({ name: 'profile_image' })
  image: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => UrlInterviews, (urlInterviews) => urlInterviews.user, {
    eager: false,
  })
  urlInterviews: UrlInterviews[];

  @OneToMany(
    () => CustomInterviews,
    (customInterviews) => customInterviews.user,
    { eager: false },
  )
  customInterviews: CustomInterviews[];
}
