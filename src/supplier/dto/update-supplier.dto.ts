import { IsString } from 'class-validator';
import { CreateSupplierDto } from './create-supplier.dto';
import { Column } from 'typeorm';

export class UpdateSupplierDto extends CreateSupplierDto {
  @IsString()
  declare id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  company_id: string;
}
