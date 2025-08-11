import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { UpdateMachineryDto } from './dto/update-machinery.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.machineryService.findAll(user.company_id);
  }

  @Authorization()
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.machineryService.findById(id);
  }

  @Authorization()
  @Post()
  create(@Authorized() user: UserEntity, @Body() dto: CreateMachineryDto) {
    return this.machineryService.create(user, dto);
  }

  @Authorization()
  @Put('/:id')
  update(
    @Authorized() user: UserEntity,
    @Param('id') id: string,
    @Body() dto: UpdateMachineryDto,
  ) {
    return this.machineryService.update(id, user, dto);
  }

  @Authorization()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.machineryService.delete(id);
  }
}
