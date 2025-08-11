import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { MachineryTaskEntity } from '../machinery_task/entities/machinery_task.entity';
import { MachineryProblemEntity } from '../machinery_problem/entities/machinery_problem.entity';
import { MachineryEntity } from '../machinery/entities/machinery.entity';
import { MachineryTaskModule } from '../machinery_task/machinery_task.module';
import { MachineryProblemModule } from '../machinery_problem/machinery_problem.module';
import { CompanyModule } from '../company/company.module';
import { MachineryModule } from '../machinery/machinery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CompanyEntity,
      MachineryTaskEntity,
      MachineryProblemEntity,
      MachineryEntity,
    ]),
    forwardRef(() => MachineryTaskModule),
    forwardRef(() => MachineryProblemModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => MachineryModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
