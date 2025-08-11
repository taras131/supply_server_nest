import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo_path: string;

  @IsString()
  owner_email: string;

  @IsString()
  @IsOptional()
  INN: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  kpp: string;

  @IsOptional()
  @IsString()
  legal_address: string;

  @IsOptional()
  @IsString()
  bik: string;

  @IsOptional()
  @IsString()
  correspondent_account: string;

  @IsOptional()
  @IsString()
  payment_account: string;

  @IsOptional()
  @IsString()
  bank: string;

  @IsOptional()
  @IsString()
  okogu: string;

  @IsOptional()
  @IsString()
  ogrn: string;

  @IsOptional()
  @IsString()
  okpo: string;

  @IsOptional()
  @IsString()
  okato: string;
}
