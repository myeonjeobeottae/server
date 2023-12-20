import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @OneToMany(
  //   () => CustomInterviews,
  //   (customInterview) => customInterview.user,
  //   { lazy: true },
  // )
  // customInterviews: CustomInterviews[];
}
