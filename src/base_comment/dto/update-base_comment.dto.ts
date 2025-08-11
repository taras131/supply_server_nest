import { IsString } from 'class-validator';
import { CreateBaseCommentDto } from './create-base_comment.dto';

export class UpdateBaseCommentDto extends CreateBaseCommentDto {
  @IsString()
  author_id: string;
}
