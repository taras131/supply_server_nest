import { IsString } from 'class-validator';

export class CreateBaseCommentDto {
  @IsString()
  text: string;
}
