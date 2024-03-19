import axios from "axios";

const createTask = async (taskDetails) => {
    try {
        const defaultDueDate = new Date();
        defaultDueDate.setDate(defaultDueDate.getDate() + 7);
        const dueDate = taskDetails.dueDate || defaultDueDate.toUTCString();
        const createdTaskDetails = {
            ...taskDetails,
            dueDate
        };
        const response = await axios.post("http://localhost:3004/tasks/", createdTaskDetails);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

const indexTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3004/tasks/");
        const data = response.data
        return data;
    } catch (error) {
        console.log("Error fetching tasks:", error);
    }
}

const updateTask = async (id, editDetails) => {
    try {
        const response = await axios.put(`http://localhost:3004/tasks/${id}`,
            editDetails
        );
        return response.data;
    } catch (error) {
        console.log("Error updating task:", error);
    }
}

const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
        return;
    }
    try {
        await axios.delete(`http://localhost:3004/tasks/${id}`);
        console.log(`Task with id ${id} deleted successfully.`);
        return true;
    } catch (error) {
        console.error("Error deleting task:", error)
        return false;
    }
}

export {
    createTask,
    indexTasks,
    updateTask,
    deleteTask
};