import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MachineryEntity } from '../../machinery/entities/machinery.entity';

@Entity({ name: 'MachineryDoc' })
export class MachineryDocEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 300,
  })
  title: string;

  @Column({
    type: 'text',
  })
  file_name: string;

  @Column({
    type: 'text',
  })
  author_id: string;

  @Column({ name: 'machinery_id', type: 'uuid' })
  machinery_id: string;

  @ManyToOne(() => MachineryEntity, (machinery) => machinery.docs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'machinery_id' })
  machinery: MachineryEntity;
}
