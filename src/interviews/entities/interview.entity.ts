import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userKakaoId: string;

  @Column()
  skill: string;

  @Column()
  position: string;

  @Column()
  time: number;
}
