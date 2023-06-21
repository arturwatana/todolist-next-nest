import { ContextContent } from "@/app/pages/Home";
import axios from "axios";
import { useContext } from "react";

type TaskCardProps = {
  id: string;
  name: string;
  project: string;
  endDated: string;
  completed: boolean;
};

export default function TaskCard(props: TaskCardProps) {
  const { setMessage, setUpdateTasks } = useContext(ContextContent);

  async function completeTask() {
    try {
      await axios.put(`http://localhost:8080/tasks/${props.id}/complete`);
      setMessage("Task completada com sucesso!");
      setUpdateTasks(true);
    } catch (err: any) {
      setMessage("Ops, algo deu errado");
    }
  }

  return (
    <div className="w-full flex items-center  justify-evenly border-2 border-blue-300 rounded-full p-2">
      <h1 className="font-bold text-2xl">{props.name}</h1>
      <h3 className="font-bold text-1xl">{props.project}</h3>
      <p>{props.endDated}</p>
      <button
        type="button"
        className=" bg-blue-800 text-white text-bold p-2  rounded-full"
        onClick={completeTask}
      >
        Concluir
      </button>
    </div>
  );
}
