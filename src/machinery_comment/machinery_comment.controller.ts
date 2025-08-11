import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineryCommentService } from './machinery_comment.service';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { CreateMachineryCommentDto } from './dto/create-machinery_comment.dto';
import { UpdateMachineryCommentDto } from './dto/update-machinery_comment.dto';

@Controller('machinery-comment')
export class MachineryCommentController {
  constructor(
    private readonly machineryCommentService: MachineryCommentService,
  ) {}

  @Authorization()
  @Post()
  create(
    @Authorized() user: UserEntity,
    @Body() dto: CreateMachineryCommentDto,
  ) {
    return this.machineryCommentService.create(user.id, user.company_id, dto);
  }

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.machineryCommentService.findAll(user.company_id);
  }

  @Authorization()
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.machineryCommentService.findById(id);
  }

  @Authorization()
  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMachineryCommentDto) {
    return this.machineryCommentService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.machineryCommentService.delete(id);
  }
}
