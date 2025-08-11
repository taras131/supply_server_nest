import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  company_id: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  telegram?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  first_name: string;

  @IsString()
  middle_name: string;

  @IsNumber()
  role_id: number;

  @IsNumber()
  @IsOptional()
  status_id: number;

  @IsString()
  @IsOptional()
  passport_series: string;

  @IsString()
  @IsOptional()
  passport_number: string;

  @IsString()
  @IsOptional()
  passport_issued_date: string;

  @IsString()
  @IsOptional()
  passport_issued_whom: string;

  @IsString()
  @IsOptional()
  avatarPath?: string;
}
