import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findById(company_id: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({
      where: { id: company_id },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async create(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const company = this.companyRepository.create(dto);
    return await this.companyRepository.save(company);
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<CompanyEntity> {
    const company = await this.findById(id);
    Object.assign(company, dto);
    return await this.companyRepository.save(company);
  }

  async delete(id: string): Promise<CompanyEntity> {
    const company = await this.findById(id);
    return await this.companyRepository.remove(company);
  }
}
