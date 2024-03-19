import React from "react";
import { indexTasks } from '../../helpers/dataFetching';
import TaskCard from "../TaskCard";
import TaskForm from "../TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = React.useState([]);

  const getAllTasks = async () => {
    const data = await indexTasks();
    setTasks(data)
  }

  React.useEffect(() => {
    getAllTasks();
  }, []);

  const handleTaskSubmit = (result) => {
    const itemIndex = tasks.findIndex(task => task.id === result.id);
    const copiedTasks = [...tasks];
    if (itemIndex === -1) {
      copiedTasks.push(result);
    } else {
      copiedTasks[itemIndex] = result;
    }
    setTasks(copiedTasks);
  }

 const handleTaskDelete = (id) => {
    const updateTasks = tasks.filter(task => task.id !== id);
    setTasks(updateTasks);
 }

  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onTaskDelete={handleTaskDelete}
        />
      ))}
      <TaskForm
      onTaskSubmit={handleTaskSubmit}
      />
    </div>
  )
}