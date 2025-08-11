import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MachineryTaskService } from './machinery_task.service';
import { CreateMachineryTaskDto } from './dto/create-machinery_task.dto';
import { UpdateMachineryTaskDto } from './dto/update-machinery_task.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('machinery-task')
export class MachineryTaskController {
  constructor(private readonly machineryTaskService: MachineryTaskService) {}

  @Authorization()
  @Post()
  create(@Authorized() user: UserEntity, @Body() dto: CreateMachineryTaskDto) {
    return this.machineryTaskService.create(user.id, user.company_id, dto);
  }

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.machineryTaskService.findAll(user.company_id);
  }

  @Authorization()
  @Get('by_machinery/:machinery_id')
  getByMachineryId(@Param('machinery_id') machinery_id: string) {
    return this.machineryTaskService.findByMachineryId(machinery_id);
  }

  @Authorization()
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.machineryTaskService.findById(id);
  }

  @Authorization()
  @Put('/:id')
  update(
    @Authorized() user: UserEntity,
    @Param('id') id: string,
    @Body() dto: UpdateMachineryTaskDto,
  ) {
    return this.machineryTaskService.update(id, user.id, dto);
  }

  @Authorization()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.machineryTaskService.delete(id);
  }
}
