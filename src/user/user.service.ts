import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { v4 } from 'uuid';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly companyService: CompanyService,
  ) {}

  async findAll(company_id: string): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { company_id } });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['company'],
    });
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const company = await this.companyService.findById(dto.company_id);
    if (!dto.id) {
      dto.id = v4();
    }
    const newUser = this.userRepository.create({ ...dto, company: company });
    return await this.userRepository.save(newUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.findById(id);
    return await this.userRepository.remove(user);
  }
}
