import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';
import { SupplierEntity } from '../../supplier/entities/supplier.entity';

@Entity({ name: 'Company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo_path: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  owner_email: string;

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
    nullable: true,
  })
  kpp: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  Legal_address: string;

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

  @OneToMany(() => UserEntity, (user) => user.company)
  users: UserEntity[];

  @OneToMany(() => MachineryEntity, (machinery) => machinery.company)
  machinery: MachineryEntity[];

  @OneToMany(() => SupplierEntity, (supplier) => supplier.company)
  suppliers: MachineryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
