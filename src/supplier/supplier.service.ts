import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
    private readonly companyService: CompanyService,
  ) {}

  async create(
    dto: CreateSupplierDto,
    company_id: string,
  ): Promise<SupplierEntity> {
    const supplier = this.supplierRepository.create({
      ...dto,
      company_id: company_id,
    });
    return await this.supplierRepository.save(supplier);
  }

  async findAll(company_id: string): Promise<SupplierEntity[]> {
    return this.supplierRepository.find({ where: { company_id } });
  }

  async findById(id: string): Promise<SupplierEntity> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('supplier not found');
    return supplier;
  }

  async update(dto: UpdateSupplierDto): Promise<SupplierEntity> {
    const supplier = await this.findById(dto.id);
    Object.assign(supplier, dto);
    return await this.supplierRepository.save(supplier);
  }

  async delete(id: string): Promise<SupplierEntity> {
    const supplier = await this.findById(id);
    return await this.supplierRepository.remove(supplier);
  }
}
