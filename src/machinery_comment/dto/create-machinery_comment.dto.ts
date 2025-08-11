import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateBaseCommentDto } from '../../base_comment/dto/create-base_comment.dto';

export class CreateMachineryCommentDto extends CreateBaseCommentDto {
  @IsBoolean()
  is_active: boolean;

  @IsString()
  machinery_id: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  photos: string[];
}
