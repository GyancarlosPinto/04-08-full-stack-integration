import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import TaskForm from "../TaskForm";
import { updateTask } from "../../helpers/dataFetching";


export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [task, setTask] = React.useState(null);

    React.useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3004/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error("Error fetching task details:", error)
            }
        };
        fetchTask();
    }, [id]);

    const handleUpdateTask = async (updateTask) => {
        if (updateTask) {
            navigate('/');
        }
    };

    if (!task) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <TaskForm
            existingTask={task}
            onTaskSubmit={handleUpdateTask}
            />
        </div>
    );
};