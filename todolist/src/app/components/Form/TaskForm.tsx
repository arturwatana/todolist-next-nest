"use client";

import { useContext, useState } from "react";
import Input from "./Input/Input";
import { ITask } from "@/app/Task/entity/Task.entity";
import { toast } from "react-toastify";

import axios from "axios";
import { ContextContent } from "@/app/pages/Home";

export default function TaskForm() {
  const { message, setMessage, setUpdateTasks } = useContext(ContextContent);
  const [taskData, setTaskData] = useState<ITask>({
    name: "",
    endDate: "",
    project: "",
  });

  function onChange(e: any) {
    switch (e.target.id) {
      case "taskName":
        setTaskData({
          ...taskData,
          name: e.target.value,
        });
        break;
      case "project":
        setTaskData({
          ...taskData,
          project: e.target.value,
        });
        break;
      case "endDate":
        setTaskData({
          ...taskData,
          endDate: e.target.value,
        });
        break;
    }
  }

  async function onSubmit() {
    try {
      const res = await axios.post("http://localhost:8080/tasks", taskData);
      if (res.status === 400) {
        setMessage(res.data.message);
      }
      setMessage("Task criada com sucesso!");
      setUpdateTasks(true);
    } catch (err: any) {
      setMessage(err.data.message);
    }
  }

  return (
    <form className="border-2 border-blue-300 pt-10 pb-10 p-16 rounded-3xl flex flex-col gap-4 h-max">
      <Input
        labelName="Digite o nome da task"
        name="taskName"
        onChange={onChange}
      />
      <Input
        labelName="Digite o nome do projeto"
        type="text"
        name="project"
        onChange={onChange}
      />
      <Input
        labelName="Digite a data"
        type="date"
        name="endDate"
        onChange={onChange}
      />
      <button
        type="button"
        className="bg-blue-400 font-bold text-center rounded-full h-8"
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );
}
