import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineryService } from '../machinery/machinery.service';
import { MachineryDocEntity } from './entities/machinery_doc.entity';
import { CreateMachineryDocDto } from './dto/create-machinery_doc.dto';
import { UpdateMachineryDocDto } from './dto/update-machinery_doc.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MachineryDocService {
  constructor(
    @InjectRepository(MachineryDocEntity)
    private readonly machineryDocRepository: Repository<MachineryDocEntity>,
    private readonly userService: UserService,
    private readonly machineryService: MachineryService,
  ) {}

  async findAll(machinery_id: string): Promise<MachineryDocEntity[]> {
    return this.machineryDocRepository.find();
  }

  async findById(id: string): Promise<MachineryDocEntity> {
    const machineryDoc = await this.machineryDocRepository.findOne({
      where: { id },
    });
    if (!machineryDoc) {
      throw new NotFoundException('Doc not found');
    }
    return machineryDoc;
  }

  async create(author_id: string, dto: CreateMachineryDocDto) {
    const { machinery_id } = dto;
    const machinery = await this.machineryService.findById(machinery_id);
    const doc = this.machineryDocRepository.create({
      title: dto.title,
      file_name: dto.file_name,
      author_id: author_id,
      machinery_id: dto.machinery_id,
      machinery,
    });
    return await this.machineryDocRepository.save(doc);
  }

  async update(
    id: string,
    dto: UpdateMachineryDocDto,
  ): Promise<MachineryDocEntity> {
    const doc = await this.findById(id);
    Object.assign(doc, dto);
    return await this.machineryDocRepository.save(doc);
  }

  async delete(id: string): Promise<MachineryDocEntity> {
    const doc = await this.findById(id);
    const res = await this.machineryDocRepository.remove(doc);
    return { ...res, id };
  }
}
