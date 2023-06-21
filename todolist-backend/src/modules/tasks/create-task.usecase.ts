import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma.service';
import { ITask, Task } from './entity/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(taskprops: ITask) {
    const task = Task.create(taskprops);
    return await this.prisma.task.create({
      data: task,
    });
  }
}
