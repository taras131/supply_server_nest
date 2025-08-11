import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMachineryTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  type_id: number;

  @IsNumber()
  status_id: number;

  @IsNumber()
  priority_id: number;

  @IsNumber()
  due_date: number;

  @IsNumber()
  @IsOptional()
  issue_operating: number;

  @IsNumber()
  @IsOptional()
  issue_odometer: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  issue_photos: string[];

  @IsOptional()
  @IsString()
  event_location: string;

  @IsString()
  @IsOptional()
  assigned_to_id: string;

  @IsString()
  machinery_id: string;

  @IsString()
  @IsOptional()
  problem_id: string;
}
