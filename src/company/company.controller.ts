import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.companyService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Authorization()
  @Put()
  update(@Authorized() user: UserEntity, @Body() dto: UpdateCompanyDto) {
    if (user.email !== dto.owner_email) {
      throw new NotFoundException('User not owner');
    }
    return this.companyService.update(user.company_id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.delete(id);
  }
}
