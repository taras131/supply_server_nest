import { IsString } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends CreateCompanyDto{
  @IsString()
  id: string;
}
