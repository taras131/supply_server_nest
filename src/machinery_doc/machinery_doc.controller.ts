import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMachineryDocDto } from './dto/create-machinery_doc.dto';
import { UpdateMachineryDocDto } from './dto/update-machinery_doc.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { MachineryDocService } from './machinery_doc.service';

@Controller('machinery-docs')
export class MachineryDocsController {
  constructor(private readonly machineryDocService: MachineryDocService) {}

  @Get('/:machinery_id')
  getAll(@Param('machinery_id') machinery_id: string) {
    return this.machineryDocService.findAll(machinery_id);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.machineryDocService.findById(id);
  }

  @Authorization()
  @Post()
  create(@Authorized() user: UserEntity, @Body() dto: CreateMachineryDocDto) {
    return this.machineryDocService.create(user.id, dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMachineryDocDto) {
    return this.machineryDocService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.machineryDocService.delete(id);
  }
}
