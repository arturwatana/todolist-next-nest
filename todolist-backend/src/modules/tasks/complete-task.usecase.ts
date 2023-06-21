import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma.service';

@Injectable()
export class CompleteTaskUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        completed: true,
      },
    });
  }
}
