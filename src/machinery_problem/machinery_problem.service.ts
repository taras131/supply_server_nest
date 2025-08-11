import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineryProblemEntity } from './entities/machinery_problem.entity';
import { CreateMachineryProblemDto } from './dto/create-machinery_problem.dto';
import { UpdateMachineryProblemDto } from './dto/update-machinery_problem.dto';
import { UserService } from '../user/user.service';
import { MachineryService } from '../machinery/machinery.service';

@Injectable()
export class MachineryProblemService {
  constructor(
    @InjectRepository(MachineryProblemEntity)
    private readonly machineryProblemRepository: Repository<MachineryProblemEntity>,
    private readonly userService: UserService,
    private readonly machineryService: MachineryService,
  ) {}

  async create(
    author_id: string,
    company_id: string,
    dto: CreateMachineryProblemDto,
  ): Promise<MachineryProblemEntity> {
    const {
      title,
      description,
      photos,
      priority_id,
      category_id,
      status_id,
      operating,
      odometer,
      machinery_id,
    } = dto;
    const machinery = await this.machineryService.findById(machinery_id);
    const author = await this.userService.findById(author_id);
    const newProblem = this.machineryProblemRepository.create({
      title,
      description,
      photos,
      priority_id,
      category_id,
      status_id,
      operating,
      odometer,
      author,
      machinery,
      company_id,
    });
    return await this.machineryProblemRepository.save(newProblem);
  }

  async findAll(company_id: string): Promise<MachineryProblemEntity[]> {
    return this.machineryProblemRepository.find({
      where: { company_id },
      relations: ['machinery'],
    });
  }

  async findByMachineryId(
    machinery_id: string,
  ): Promise<MachineryProblemEntity[]> {
    return this.machineryProblemRepository.find({
      where: { machinery_id },
      relations: ['author', 'updated_author'],
    });
  }

  async findById(id: string): Promise<MachineryProblemEntity> {
    const problem = await this.machineryProblemRepository.findOne({
      where: { id },
      relations: ['author', 'updated_author', 'machinery', 'tasks'],
    });
    if (!problem) {
      throw new NotFoundException('problem not found');
    }
    return problem;
  }

  async update(
    updated_author_id: string,
    dto: UpdateMachineryProblemDto,
  ): Promise<MachineryProblemEntity> {
    const problem = await this.findById(dto.id);
    const updated_author = await this.userService.findById(updated_author_id);
    if (dto.result_date === 0 && dto.status_id === 3) {
      dto.result_date = Date.now();
    }
    Object.assign(problem, { ...dto, updated_author });
    return await this.machineryProblemRepository.save(problem);
  }

  async delete(id: string): Promise<MachineryProblemEntity> {
    const problem = await this.findById(id);
    return await this.machineryProblemRepository.remove(problem);
  }
}
