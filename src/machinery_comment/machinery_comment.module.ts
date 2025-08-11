import { forwardRef, Module } from '@nestjs/common';
import { MachineryCommentService } from './machinery_comment.service';
import { MachineryCommentController } from './machinery_comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { MachineryEntity } from '../machinery/entities/machinery.entity';
import { UserModule } from '../user/user.module';
import { MachineryModule } from '../machinery/machinery.module';
import { CompanyModule } from '../company/company.module';
import { MachineryCommentEntity } from './entities/machinery_comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineryCommentEntity,
      UserEntity,
      MachineryEntity,
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => MachineryModule),
    forwardRef(() => CompanyModule),
  ],
  controllers: [MachineryCommentController],
  providers: [MachineryCommentService],
  exports: [MachineryCommentService],
})
export class MachineryCommentModule {}
