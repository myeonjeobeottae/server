import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CareersInterviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userKakaoId: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'careers_contents', type: 'text' })
  careersContents: string;

  @Column({ name: 'careers_URL' })
  careersURL: string;

  @Column()
  time: number;
}
