import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity({ name: 'Supplier' })
export class SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  firebase_id?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo_path: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  owner_email: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  INN: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  manager_email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  accounts_department_email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  kpp: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  legal_address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  bik: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  correspondent_account: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  payment_account: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  bank: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  okogu: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  ogrn: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  okpo: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  okato: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.suppliers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
