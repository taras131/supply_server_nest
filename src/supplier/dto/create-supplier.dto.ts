import { IsOptional, IsString } from 'class-validator';
import { CreateCompanyDto } from '../../company/dto/create-company.dto';

export class CreateSupplierDto extends CreateCompanyDto {
  @IsOptional()
  @IsString()
  firebase_id?: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  manager_email: string;

  @IsOptional()
  @IsString()
  accounts_department_email: string;
}
