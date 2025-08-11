import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../../company/enteties/company.entety';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  middleName: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  role: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatarPath: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
