import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';
import { MachineryProblemEntity } from '../../machinery_problem/entities/machinery_problem.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'MachineryTask' })
export class MachineryTaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  company_id: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'int',
  })
  type_id: number;

  @Column({
    type: 'int',
  })
  status_id: number;

  @Column({
    type: 'int',
  })
  priority_id: number;

  @Column({
    type: 'bigint',
  })
  due_date: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  issue_operating: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  issue_odometer: number;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  issue_photos: string[];

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  event_location: string;

  @Column({
    type: 'bigint',
    nullable: true,
    default: 0,
  })
  result_date: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  result_odometer: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  result_operating: number;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  result_description: string;

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  result_spent_resources: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    default: () => "'{}'",
  })
  result_photos: string[];

  @Column({ name: 'machinery_id', type: 'uuid' })
  machinery_id: string;

  @ManyToOne(() => MachineryEntity, (machinery) => machinery.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machinery_id' })
  machinery: MachineryEntity;

  @Column({ name: 'problem_id', type: 'uuid' })
  problem_id: string | null;

  @ManyToOne(
    () => MachineryProblemEntity,
    (machineryProblem) => machineryProblem.tasks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'problem_id' })
  problem: MachineryProblemEntity;

  @Column({ name: 'author_id', type: 'uuid' })
  author_id: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks_author, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ name: 'updated_author_id', type: 'uuid', nullable: true })
  updated_author_id: string | null;

  @ManyToOne(() => UserEntity, (user) => user.updated_author, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'updated_author_id' })
  updated_author: UserEntity;

  @Column({ name: 'assigned_to_id', type: 'uuid' })
  assigned_to_id: string | null;

  @ManyToOne(() => UserEntity, (user) => user.tasks_assigned_to, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assigned_to_id' })
  assigned_to: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
