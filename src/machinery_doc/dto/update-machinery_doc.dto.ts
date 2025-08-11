import { IsOptional, IsString } from 'class-validator';
import { CreateMachineryDocDto } from './create-machinery_doc.dto';

export class UpdateMachineryDocDto extends CreateMachineryDocDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  author_id: string;
}
