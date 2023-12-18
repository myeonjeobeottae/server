import { CustomInterviews } from 'src/custom-interviews/entities/customInterviews.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
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

  @OneToMany(
    () => CustomInterviews,
    (customInterview) => customInterview.user,
    { lazy: true },
  )
  customInterviews: CustomInterviews[];
}
