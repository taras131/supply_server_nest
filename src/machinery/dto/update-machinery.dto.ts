import { IsString } from 'class-validator';
import { CreateMachineryDto } from './create-machinery.dto';

export class UpdateMachineryDto extends CreateMachineryDto {
  @IsString()
  declare id: string;

  @IsString()
  company_id: string;
}
