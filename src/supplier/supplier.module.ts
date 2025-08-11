import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { CompanyService } from '../company/company.service';
import { CompanyEntity } from '../company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, CompanyEntity])],
  controllers: [SupplierController],
  providers: [SupplierService, CompanyService],
})
export class SupplierModule {}
