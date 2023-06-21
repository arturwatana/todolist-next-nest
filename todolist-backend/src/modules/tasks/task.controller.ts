import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaService } from '../Prisma.service';
import { ITask } from './entity/task.entity';
import { CreateTaskUseCase } from './create-task.usecase';
import { CompleteTaskUseCase } from './complete-task.usecase';

@Controller('/tasks')
export class TaskController {
  constructor(
    private completeTaskUseCase: CompleteTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private prisma: PrismaService,
  ) {}
  @Get()
  async getAll() {
    return await this.prisma.task.findMany();
  }

  @Post()
  async create(@Body() data: ITask) {
    return await this.createTaskUseCase.execute(data);
  }

  @Delete()
  async delete(@Body() data: any) {
    await this.prisma.task.delete({
      where: {
        id: data.id,
      },
    });
  }

  @Put('/:id/complete')
  async completeTask(@Param('id') id: string) {
    await this.completeTaskUseCase.execute(id);
  }
}
