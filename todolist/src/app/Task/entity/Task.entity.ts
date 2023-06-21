export type ITask = {
  name: string;
  project: string;
  endDate: string;
};

export class Task {
  id?: string;
  name: string;
  project: string;
  endDate: string;
  completed?: boolean;

  private constructor(data: ITask) {
    this.name = data.name;
    this.project = data.project;
    this.endDate = data.endDate;
  }

  static create(data: ITask): Task {
    const task = new Task(data);
    return task;
  }
}
