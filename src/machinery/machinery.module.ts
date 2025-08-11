import { Module } from '@nestjs/common';
import { MachineryService } from './machinery.service';
import { MachineryController } from './machinery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineryEntity } from './entities/machinery.entity';
import { CompanyEntity } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MachineryEntity, CompanyEntity, UserEntity]),
  ],
  controllers: [MachineryController],
  providers: [MachineryService, CompanyService, UserService],
  exports: [MachineryService],
})
export class MachineryModule {}
