import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMachineryProblemDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  photos: string[];

  @IsNumber()
  priority_id: number;

  @IsNumber()
  category_id: number;

  @IsNumber()
  status_id: number;

  @IsNumber()
  @IsOptional()
  operating: number;

  @IsNumber()
  @IsOptional()
  odometer: number;

  @IsString()
  machinery_id: string;
}
