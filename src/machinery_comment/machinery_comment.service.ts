import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineryCommentEntity } from './entities/machinery_comment.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { MachineryService } from '../machinery/machinery.service';
import { CreateMachineryCommentDto } from './dto/create-machinery_comment.dto';
import { UpdateMachineryCommentDto } from './dto/update-machinery_comment.dto';

@Injectable()
export class MachineryCommentService {
  constructor(
    @InjectRepository(MachineryCommentEntity)
    private readonly machineryCommentRepository: Repository<MachineryCommentEntity>,
    private readonly userService: UserService,
    private readonly machineryService: MachineryService,
  ) {}

  async create(
    author_id: string,
    company_id: string,
    dto: CreateMachineryCommentDto,
  ) {
    const { machinery_id } = dto;
    const machinery = await this.machineryService.findById(machinery_id);
    const author = await this.userService.findById(author_id);
    const comment_in = this.machineryCommentRepository.create({
      ...dto,
      company_id,
      author_id: author_id,
      author: author,
      machinery_id: dto.machinery_id,
      machinery,
    });
    return await this.machineryCommentRepository.save(comment_in);
  }

  async findAll(company_id: string): Promise<MachineryCommentEntity[]> {
    return this.machineryCommentRepository.find({
      where: { company_id },
      relations: ['author', 'machinery'],
    });
  }

  async findById(id: string): Promise<MachineryCommentEntity> {
    const comment = await this.machineryCommentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async update(
    id: string,
    dto: UpdateMachineryCommentDto,
  ): Promise<MachineryCommentEntity> {
    const comment = await this.findById(id);
    Object.assign(comment, dto);
    return await this.machineryCommentRepository.save(comment);
  }

  async delete(id: string): Promise<MachineryCommentEntity> {
    const doc = await this.findById(id);
    const res = await this.machineryCommentRepository.remove(doc);
    return { ...res, id };
  }
}
