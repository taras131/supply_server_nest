import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from './entities/user.entity';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.userService.findAll(user.company_id);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Authorization()
  @Put()
  update(@Authorized() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @Authorization()
  @Delete()
  delete(@Authorized() user: UserEntity) {
    return this.userService.delete(user.id);
  }
}
