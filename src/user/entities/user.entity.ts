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
import { CompanyEntity } from '../../company/entities/company.entity';
import { MachineryProblemEntity } from '../../machinery_problem/entities/machinery_problem.entity';
import { MachineryTaskEntity } from '../../machinery_task/entities/machinery_task.entity';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';
import { MachineryCommentEntity } from '../../machinery_comment/entities/machinery_comment.entity';

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
    nullable: true,
  })
  telegram: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  middle_name: string;

  @Column({
    type: 'int',
  })
  role_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  status_id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  avatar_path: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  passport_series: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  passport_number: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  passport_issued_date: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  passport_issued_whom: string;

  @Column({ name: 'company_id', type: 'uuid' })
  company_id: string;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(
    () => MachineryProblemEntity,
    (machineryProblem) => machineryProblem.author,
  )
  machineryProblems: MachineryProblemEntity[];

  @OneToMany(() => MachineryProblemEntity, (machinery) => machinery.author)
  machinery: MachineryEntity[];

  @OneToMany(() => MachineryTaskEntity, (machineryTask) => machineryTask.author)
  tasks_author: MachineryTaskEntity[];

  @OneToMany(
    () => MachineryCommentEntity,
    (machineryComment) => machineryComment.author,
  )
  comment_author: MachineryCommentEntity[];

  @OneToMany(
    () => MachineryTaskEntity,
    (machineryTask) => machineryTask.updated_author,
  )
  updated_author: MachineryTaskEntity[];

  @OneToMany(
    () => MachineryTaskEntity,
    (machineryTask) => machineryTask.assigned_to,
  )
  tasks_assigned_to: MachineryTaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
