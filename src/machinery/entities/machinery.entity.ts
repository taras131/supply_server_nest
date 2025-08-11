import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MachineryProblemEntity } from '../../machinery_problem/entities/machinery_problem.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { MachineryDocEntity } from '../../machinery_doc/entities/machinery_doc.entity';
import { MachineryTaskEntity } from '../../machinery_task/entities/machinery_task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { MachineryCommentEntity } from '../../machinery_comment/entities/machinery_comment.entity';

@Entity({ name: 'Machinery' })
export class MachineryEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    default: '',
  })
  firebase_id: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  brand: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  model: string;

  @Column({
    type: 'varchar',
  })
  year_manufacture: string;

  @Column({
    type: 'int',
  })
  type_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  operating: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  odometer: number;

  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  photos: string[];

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  vin: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  state_number: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  status: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  engine_type_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  traction_type_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  transmission_type_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  operating_type_id: number;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  working_equipment: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  engine_brand: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  engine_model: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  transmission_brand: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  transmission_model: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  frame_number: string;

  @OneToMany(() => MachineryDocEntity, (machineryDoc) => machineryDoc.machinery)
  docs: MachineryDocEntity[];

  @OneToMany(
    () => MachineryProblemEntity,
    (machineryProblem) => machineryProblem.machinery,
  )
  problems: MachineryProblemEntity[];

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => MachineryTaskEntity,
    (machineryTask) => machineryTask.machinery,
  )
  tasks: MachineryTaskEntity[];

  @OneToMany(
    () => MachineryCommentEntity,
    (machineryComment) => machineryComment.machinery,
  )
  comments: MachineryTaskEntity[];

  @Column({ name: 'author_id', type: 'uuid' })
  author_id: string;

  @ManyToOne(() => UserEntity, (user) => user.machinery, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ name: 'updated_author_id', type: 'uuid', nullable: true })
  updated_author_id: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_author_id' })
  updated_author: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
