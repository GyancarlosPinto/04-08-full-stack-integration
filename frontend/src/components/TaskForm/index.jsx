import React from "react";
import { createTask, updateTask} from "../../helpers/tasksFetcher";

export default function TaskForm({ existingTask, onTaskSubmit}) {
    const [title, setTitle] = React.useState(existingTask?.title || "");
    const [description, setDescription] = React.useState(existingTask?.description || "");
    const [status, setStatus] = React.useState(existingTask?.status || "Pending...");
    const [dueDate, setDueDate] = React.useState(existingTask?.dueDate || "");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const taskDetails = {
            title,
            description,
            status,
            dueDate
        };

        let result;
        if (existingTask) {
            result = await updateTask(existingTask.id, taskDetails);
        } else {
            result = await createTask(taskDetails);
        }

        if (result) {
            onTaskSubmit(result)
        }
    }

    let formatDueDate;
    if (dueDate) {
        formatDueDate = (new Date(dueDate)).toISOString().split("T")[0];
    } else {
        formatDueDate = (new Date()).toISOString().split("T")[0];
    } 

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <label htmlFor="description">Description</label>
            <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
            <label htmlFor="status">Status</label>
            <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <label htmlFor="dueDate">Due Date</label>
            <input
            id="dueDate"
            type="date"
            value={formatDueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            />
            <button type="submit">{existingTask ? "Update Task" : "Create Task"}</button>
        </form>
    )
}