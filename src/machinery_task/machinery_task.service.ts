import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { MachineryService } from '../machinery/machinery.service';
import { MachineryTaskEntity } from './entities/machinery_task.entity';
import { MachineryProblemService } from '../machinery_problem/machinery_problem.service';
import { CreateMachineryTaskDto } from './dto/create-machinery_task.dto';
import { UpdateMachineryTaskDto } from './dto/update-machinery_task.dto';

@Injectable()
export class MachineryTaskService {
  constructor(
    @InjectRepository(MachineryTaskEntity)
    private readonly machineryTaskRepository: Repository<MachineryTaskEntity>,
    private readonly userService: UserService,
    private readonly machineryService: MachineryService,
    private readonly machineryProblemService: MachineryProblemService,
  ) {}

  async findAll(company_id: string): Promise<MachineryTaskEntity[]> {
    return this.machineryTaskRepository.find({
      where: { company_id },
      relations: ['author', 'updated_author', 'assigned_to', 'machinery'],
    });
  }

  async findByMachineryId(
    machinery_id: string,
  ): Promise<MachineryTaskEntity[]> {
    return this.machineryTaskRepository.find({
      where: { machinery_id },
      relations: ['author', 'updated_author'],
    });
  }

  async findById(id: string): Promise<MachineryTaskEntity> {
    const task = await this.machineryTaskRepository.findOne({
      where: { id },
      relations: [
        'author',
        'updated_author',
        'assigned_to',
        'problem',
        'problem.author',
        'problem.updated_author',
      ],
    });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  async create(
    author_id: string,
    company_id: string,
    dto: CreateMachineryTaskDto,
  ): Promise<MachineryTaskEntity> {
    const machinery =
      (await this.machineryService.findById(dto.machinery_id)) || null;
    const author = (await this.userService.findById(author_id)) || null;
    const assigned_to =
      (await this.userService.findById(dto.assigned_to_id)) || null;
    const problem =
      (await this.machineryProblemService.findById(dto.problem_id)) || null;
    const task = this.machineryTaskRepository.create({
      ...dto,
      machinery,
      author,
      assigned_to,
      problem,
      company_id,
    });
    if (problem && problem.status_id === 1) {
      await this.machineryProblemService.update(author_id, {
        ...problem,
        status_id: 2,
      });
    }
    return await this.machineryTaskRepository.save(task);
  }

  async update(
    id: string,
    updated_author_id: string,
    dto: UpdateMachineryTaskDto,
  ): Promise<MachineryTaskEntity> {
    const updated_author =
      (await this.userService.findById(updated_author_id)) || null;
    const assigned_to =
      (await this.userService.findById(dto.assigned_to_id)) || null;
    const task = await this.findById(id);
    if (dto.result_date === 0 && dto.status_id === 3) {
      dto.result_date = Date.now();
    }
    Object.assign(task, dto);
    return await this.machineryTaskRepository.save({
      ...task,
      updated_author,
      assigned_to,
    });
  }

  async delete(id: string): Promise<MachineryTaskEntity> {
    const task = await this.findById(id);
    return await this.machineryTaskRepository.remove(task);
  }
}
