import { forwardRef, Module } from '@nestjs/common';
import { MachineryProblemService } from './machinery_problem.service';
import { MachineryProblemController } from './machinery_problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { MachineryEntity } from '../machinery/entities/machinery.entity';
import { MachineryProblemEntity } from './entities/machinery_problem.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { MachineryTaskEntity } from '../machinery_task/entities/machinery_task.entity';
import { MachineryTaskModule } from '../machinery_task/machinery_task.module';
import { UserModule } from '../user/user.module';
import { MachineryModule } from '../machinery/machinery.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineryProblemEntity,
      UserEntity,
      MachineryEntity,
      CompanyEntity,
      MachineryTaskEntity,
    ]),
    forwardRef(() => MachineryTaskModule),
    forwardRef(() => UserModule),
    forwardRef(() => MachineryModule),
    forwardRef(() => CompanyModule),
  ],
  controllers: [MachineryProblemController],
  providers: [MachineryProblemService],
  exports: [MachineryProblemService],
})
export class MachineryProblemModule {}
