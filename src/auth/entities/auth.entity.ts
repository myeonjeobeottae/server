import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'kakao_id' })
  userKaKaoId: string;

  @Column()
  nickname: string;

  @Column({ name: 'profile_image' })
  image: string;

  @Column({ nullable: true })
  email: string;
}
