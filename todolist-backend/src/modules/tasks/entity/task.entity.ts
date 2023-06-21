import { HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type ITask = {
  name: string;
  project: string;
  endDate: string;
};

export class Task {
  id: string;
  name: string;
  project: string;
  createdAt: string;
  endDate: string;
  completed: boolean;

  private constructor(data: ITask) {
    if (!data.name) {
      throw new HttpException(
        'A task must have a name',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!data.project) {
      throw new HttpException(
        'A task must have a project',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!data.endDate) {
      throw new HttpException(
        'A task must have a endDate',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.id = randomUUID();
    this.name = data.name;
    this.project = data.project;
    this.createdAt = new Date().toString();
    this.endDate = data.endDate;
    this.completed = false;
  }

  static create(data: ITask): Task {
    const task = new Task(data);
    return task;
  }
}
