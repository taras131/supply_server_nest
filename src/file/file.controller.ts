import {
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Authorization()
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(jpg|jpeg|png|PNG|webp|pdf)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: (1000 * 1000 + 200) * 200,
            message: 'Max file size should be less than 200 MB',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.upload(file);
  }

  @Authorization()
  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    return this.fileService.delete(filename);
  }
}
