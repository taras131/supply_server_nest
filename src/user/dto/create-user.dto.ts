import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  company_id: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  email: string;

  @IsString()
  @IsOptional()
  telegram?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @Length(2, 30, { message: 'Имя должно быть от 2 до 30 символов' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  middle_name: string;

  @IsNumber()
  role_id: number;

  @IsNumber()
  @IsOptional()
  status_id: number;

  @IsString()
  @IsOptional()
  avatar_path?: string;
}
