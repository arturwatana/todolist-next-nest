"use client";
import TaskForm from "../components/Form/TaskForm";
import TaskCard from "../components/TaskCard/TaskCard";
import { createContext, useEffect, useState } from "react";
import { Task } from "../Task/entity/Task.entity";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export type ContextProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setUpdateTasks: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ContextContent = createContext<ContextProps>({
  message: "",
  setMessage: () => {},
  setUpdateTasks: () => {},
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>("");
  const [notify, setNotify] = useState<boolean>(false);
  const [updateTasks, setUpdateTasks] = useState<boolean>(false);

  const contextValues = {
    message,
    setMessage,
    setUpdateTasks,
  };

  async function getTasks() {
    try {
      const req = await axios.get("http://localhost:8080/tasks");
      setTasks(req.data);
    } catch (err: any) {
      if (err.message === "Network Error") {
        setMessage("Ops, nao foi possivel carregar suas tasks");
      }
    }
  }

  function notifyMessage(message: string) {
    toast(message);
  }

  useEffect(() => {
    getTasks();
    setMessage("Suas tasks foram carregadas!");
  }, []);

  useEffect(() => {
    if (updateTasks) {
      getTasks();
      setUpdateTasks(false);
    }
  }, [updateTasks]);

  useEffect(() => {
    if (message) {
      setNotify(true);
    }
  }, [message]);

  useEffect(() => {
    if (notify) {
      notifyMessage(message);
      setNotify(false);
    }
  }, [notify]);

  return (
    <ContextContent.Provider value={contextValues}>
      <body>
        <ToastContainer />
        <div className="w-full flex justify-evenly flex-col items-center h-screen bg-gray-200 ">
          <div className="flex w-4/6 justify-center  p-5  ">
            <TaskForm />
          </div>

          <div className="h-max w-2/4 flex flex-col gap-3">
            {tasks.map((task) => {
              if (task.completed) {
                return;
              }
              return (
                <TaskCard
                  id={task.id || ""}
                  name={task.name}
                  completed={task.completed || false}
                  project={task.project}
                  endDated={task.endDate}
                />
              );
            })}
          </div>
        </div>
      </body>
    </ContextContent.Provider>
  );
}
