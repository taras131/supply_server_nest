import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Authorization()
  @Post()
  create(@Authorized() user: UserEntity, @Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto, user.company_id);
  }

  @Authorization()
  @Get()
  getAll(@Authorized() user: UserEntity) {
    return this.supplierService.findAll(user.company_id);
  }

  @Authorization()
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.supplierService.findById(id);
  }

  @Authorization()
  @Put()
  update(@Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(dto);
  }

  @Authorization()
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.supplierService.delete(id);
  }
}
