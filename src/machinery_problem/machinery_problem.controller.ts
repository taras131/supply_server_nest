import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineryProblemService } from './machinery_problem.service';
import { UpdateMachineryProblemDto } from './dto/update-machinery_problem.dto';
import { CreateMachineryProblemDto } from './dto/create-machinery_problem.dto';
import { UserEntity } from '../user/entities/user.entity';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';

@Controller('machinery-problem')
export class MachineryProblemController {
  constructor(
    private readonly machineryProblemService: MachineryProblemService,
  ) {}

  @Authorization()
  @Post()
  create(
    @Authorized() user: UserEntity,
    @Body() dto: CreateMachineryProblemDto,
  ) {
    return this.machineryProblemService.create(user.id, user.company_id, dto);
  }

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.machineryProblemService.findAll(user.company_id);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.machineryProblemService.findById(id);
  }

  @Get('/by_machinery/:machinery_id')
  getByMachineryId(@Param('machinery_id') machinery_id: string) {
    return this.machineryProblemService.findByMachineryId(machinery_id);
  }

  @Authorization()
  @Put()
  update(
    @Authorized() user: UserEntity,
    @Body() dto: UpdateMachineryProblemDto,
  ) {
    return this.machineryProblemService.update(user.id, dto);
  }

  @Authorization()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.machineryProblemService.delete(id);
  }
}
