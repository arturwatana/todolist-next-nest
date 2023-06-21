import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '../Prisma.service';
import { CreateTaskUseCase } from './create-task.usecase';
import { CompleteTaskUseCase } from './complete-task.usecase';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, CreateTaskUseCase, CompleteTaskUseCase],
  imports: [],
})
export class TaskModule {}
