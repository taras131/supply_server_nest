import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMachineryProblemDto } from './create-machinery_problem.dto';

export class UpdateMachineryProblemDto extends CreateMachineryProblemDto {
  @IsString()
  id: string;

  @IsString()
  author_id: string;

  @IsOptional()
  @IsString()
  updated_author_id: string;

  @IsOptional()
  @IsNumber()
  result_date: number;

  @IsString()
  company_id: string;
}
