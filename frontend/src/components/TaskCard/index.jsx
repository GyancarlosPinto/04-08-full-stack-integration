import React from "react";
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../helpers/tasksFetcher';

export default function TaskCard({ id, title, description, status, onTaskDelete }) {
    let navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/tasks/${id}`)
    }

    const handleDelete = async () => {
        const success = await deleteTask(id);
        if (success) {
            onTaskDelete(id);
        }
    }

    return (
        <div className="task-card">
            <h3 className="task-card-title border-2 border-orange-50">{title}</h3>
            <p>{description}</p>
            <p>{status}</p>
            <div className="task-card-footer">
                <button onClick={handleEdit} className="edit-button">Edit</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
        </div>

    )
}