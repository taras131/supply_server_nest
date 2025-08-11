import { IsString } from 'class-validator';

export class CreateMachineryDocDto {
  @IsString()
  title: string;

  @IsString()
  file_name: string;

  @IsString()
  machinery_id: string;
}
