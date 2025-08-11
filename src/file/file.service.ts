import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadDir, file.originalname);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);
    return { name: file.originalname };
  }

  delete(filename: string) {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
    }
    fs.unlinkSync(filePath);
    return { message: 'Файл удалён', name: filename };
  }
}
