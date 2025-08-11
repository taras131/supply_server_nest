import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { SupplierModule } from './supplier/supplier.module';
import { MachineryModule } from './machinery/machinery.module';
import { MachineryProblemModule } from './machinery_problem/machinery_problem.module';
import { MachineryDocModule } from './machinery_doc/machinery_doc.module';
import { MachineryTaskModule } from './machinery_task/machinery_task.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MachineryCommentModule } from './machinery_comment/machinery_comment.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
    UserModule,
    CompanyModule,
    SupplierModule,
    MachineryModule,
    MachineryProblemModule,
    MachineryDocModule,
    MachineryTaskModule,
    AuthModule,
    FileModule,
    MachineryCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
