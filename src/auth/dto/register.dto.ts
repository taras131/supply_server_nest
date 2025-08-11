import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
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

  @IsString()
  company_id: string;

  @ValidateIf((o: RegisterDto) => !o.company_id)
  @IsString()
  @MinLength(3)
  company_name?: string;
}
