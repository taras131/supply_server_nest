import { Module } from '@nestjs/common';
import { MachineryDocService } from './machinery_doc.service';
import { MachineryDocsController } from './machinery_doc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineryProblemEntity } from '../machinery_problem/entities/machinery_problem.entity';
import { UserEntity } from '../user/entities/user.entity';
import { MachineryEntity } from '../machinery/entities/machinery.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { MachineryProblemService } from '../machinery_problem/machinery_problem.service';
import { UserService } from '../user/user.service';
import { MachineryService } from '../machinery/machinery.service';
import { CompanyService } from '../company/company.service';
import { MachineryDocEntity } from './entities/machinery_doc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineryDocEntity,
      MachineryProblemEntity,
      UserEntity,
      MachineryEntity,
      CompanyEntity,
    ]),
  ],
  controllers: [MachineryDocsController],
  providers: [
    MachineryDocService,
    MachineryProblemService,
    UserService,
    MachineryService,
    CompanyService,
  ],
})
export class MachineryDocModule {}
