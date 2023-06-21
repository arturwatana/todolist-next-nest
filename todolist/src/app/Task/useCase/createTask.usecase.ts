import axios from "axios";
import { ITask } from "../entity/Task.entity";

export class CreateTaskUseCase {
  async execute(data: ITask) {
    const req = await axios.post("http://localhost:3000/tasks", data);
    console.log(req);
  }
}
