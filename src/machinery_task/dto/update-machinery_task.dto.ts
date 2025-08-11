import { CreateMachineryTaskDto } from './create-machinery_task.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMachineryTaskDto extends CreateMachineryTaskDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsOptional()
  result_date: number;

  @IsNumber()
  @IsOptional()
  result_odometer: number;

  @IsNumber()
  @IsOptional()
  result_operating: number;

  @IsString()
  result_description: string;

  @IsString()
  @IsOptional()
  result_spent_resources: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  result_photos: string[];

  @IsString()
  @IsOptional()
  updated_author_id: string;
}
