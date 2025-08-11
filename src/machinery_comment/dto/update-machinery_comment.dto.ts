import { IsString } from 'class-validator';
import { CreateMachineryCommentDto } from './create-machinery_comment.dto';

export class UpdateMachineryCommentDto extends CreateMachineryCommentDto {
  @IsString()
  author_id: string;
}