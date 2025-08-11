import { forwardRef, Module } from '@nestjs/common';
import { MachineryTaskService } from './machinery_task.service';
import { MachineryTaskController } from './machinery_task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineryProblemEntity } from '../machinery_problem/entities/machinery_problem.entity';
import { UserEntity } from '../user/entities/user.entity';
import { MachineryEntity } from '../machinery/entities/machinery.entity';
import { MachineryTaskEntity } from './entities/machinery_task.entity';
import { MachineryProblemModule } from '../machinery_problem/machinery_problem.module';
import { MachineryModule } from '../machinery/machinery.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineryTaskEntity,
      MachineryProblemEntity,
      UserEntity,
      MachineryEntity,
    ]),
    forwardRef(() => MachineryProblemModule),
    forwardRef(() => MachineryModule),
    forwardRef(() => UserModule),
  ],
  controllers: [MachineryTaskController],
  providers: [MachineryTaskService],
  exports: [MachineryTaskService],
})
export class MachineryTaskModule {}
