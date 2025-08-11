import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';
import { BaseCommentEntity } from '../../base_comment/entities/base_comment.entity';

@Entity({ name: 'MachineryComment' })
export class MachineryCommentEntity extends BaseCommentEntity {
  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  photos: string[];

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({ name: 'machinery_id', type: 'uuid' })
  machinery_id: string;

  @ManyToOne(() => MachineryEntity, (machinery) => machinery.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machinery_id' })
  machinery: MachineryEntity;
}
