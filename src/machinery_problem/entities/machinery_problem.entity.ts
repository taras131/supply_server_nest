import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { MachineryTaskEntity } from '../../machinery_task/entities/machinery_task.entity';

@Entity({ name: 'MachineryProblem' })
export class MachineryProblemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  photos: string[];

  @Column({
    type: 'int',
  })
  priority_id: number;

  @Column({
    type: 'int',
  })
  category_id: number;

  @Column({
    type: 'int',
  })
  status_id: number;

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
    type: 'bigint',
    nullable: true,
    default: 0,
  })
  result_date: number;

  @Column({
    type: 'varchar',
  })
  company_id: string;

  @Column({ name: 'machinery_id', type: 'uuid' })
  machinery_id: string;

  @ManyToOne(() => MachineryEntity, (machinery) => machinery.problems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machinery_id' })
  machinery: MachineryEntity;

  @Column({ name: 'author_id', type: 'uuid' })
  author_id: string;

  @ManyToOne(() => UserEntity, (user) => user.machineryProblems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ name: 'updated_author_id', type: 'uuid', nullable: true })
  updated_author_id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'updated_author_id' })
  updated_author: UserEntity;

  @OneToMany(
    () => MachineryTaskEntity,
    (machineryTask) => machineryTask.problem,
  )
  tasks: MachineryTaskEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
