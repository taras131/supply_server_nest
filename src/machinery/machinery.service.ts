import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineryEntity } from './entities/machinery.entity';
import { v4 } from 'uuid';
import { UpdateMachineryDto } from './dto/update-machinery.dto';
import { CreateMachineryDto } from './dto/create-machinery.dto';
import { CompanyService } from '../company/company.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MachineryService {
  constructor(
    @InjectRepository(MachineryEntity)
    private readonly machineryRepository: Repository<MachineryEntity>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  async findAll(company_id: string): Promise<any[]> {
    const machineries = await this.machineryRepository.find({
      where: { company_id },
      relations: ['tasks'],
    });
    // Текущая дата для фильтра (например, UTC сейчас)
    const now = Date.now();
    // Добавить нужные поля
    const result = machineries.map((machinery) => {
      // Фильтруем только задачи техобслуживания для этой машины
      const serviceTasks = machinery.tasks
        ? machinery.tasks.filter((task) => task.type_id === 1)
        : [];
      // 1. Ближайшее запланированное или текущее ТО
      const nextServiceTask =
        serviceTasks
          .filter((t) => t.status_id === 1 || t.status_id === 2)
          // если из этих задач есть те, что запланированы на будущее — сортируем по due_date возрастающе
          .sort((a, b) => a.due_date - b.due_date)[0] || null;
      // 2. Последнее завершённое ТО, по максимальному due_date
      const lastCompletedServiceTask =
        serviceTasks
          .filter((t) => t.status_id === 3)
          .sort((a, b) => b.due_date - a.due_date)[0] || null;
      return {
        ...machinery,
        next_service_task: nextServiceTask,
        last_completed_service_task: lastCompletedServiceTask,
      };
    });
    return result;
  }

  async findById(id: string): Promise<MachineryEntity> {
    const machinery = await this.machineryRepository.findOne({
      where: { id },
      relations: [
        'docs',
        'problems',
        'tasks',
        'tasks.author',
        'tasks.assigned_to',
        'problems.author',
        'problems.tasks',
        'author',
        'updated_author',
        'comments',
        'comments.author',
      ],
    });
    if (!machinery) throw new NotFoundException('Machinery not found');
    return machinery;
  }

  async create(
    author: UserEntity,
    dto: CreateMachineryDto,
  ): Promise<MachineryEntity> {
    if (!dto.id) {
      dto.id = v4();
    }
    const company = await this.companyService.findById(author.company_id);
    const newMachinery = this.machineryRepository.create({
      ...dto,
      company_id: author.company_id,
      company,
      author_id: author.id,
      author,
    });
    return await this.machineryRepository.save(newMachinery);
  }

  async update(
    id: string,
    updated_author: UserEntity,
    dto: UpdateMachineryDto,
  ): Promise<MachineryEntity> {
    const machinery = await this.findById(id);
    Object.assign(machinery, { ...dto, updated_author: updated_author });
    return await this.machineryRepository.save(machinery);
  }

  async delete(id: string): Promise<MachineryEntity> {
    const user = await this.findById(id);
    return await this.machineryRepository.remove(user);
  }
}
