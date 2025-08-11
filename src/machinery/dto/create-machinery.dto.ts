import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateMachineryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  firebase_id?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  model: string;

  @IsString()
  year_manufacture: string;

  @IsNumber()
  type_id: number;

  @IsNumber()
  @IsOptional()
  operating: number;

  @IsNumber()
  @IsOptional()
  odometer: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  photos: string[];

  @IsString()
  @IsOptional()
  vin: string;

  @IsString()
  @IsOptional()
  state_number: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  engine_type_id: number;

  @IsNumber()
  traction_type_id: number;

  @IsNumber()
  transmission_type_id: number;

  @IsNumber()
  @IsOptional()
  operating_type_id: number;

  @IsString()
  @IsOptional()
  working_equipment: string;

  @IsString()
  @IsOptional()
  engine_brand: string;

  @IsString()
  @IsOptional()
  engine_model: string;

  @IsString()
  @IsOptional()
  transmission_brand: string;

  @IsString()
  @IsOptional()
  transmission_model: string;

  @IsString()
  @IsOptional()
  frame_number: string;
}
