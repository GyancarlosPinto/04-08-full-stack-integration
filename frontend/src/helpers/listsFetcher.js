import axios from "axios";

const createList = async (listDetails) => {
    try {
        const response = await axios.post("http://localhost:3004/lists/", listDetails);
        return response.data;
    } catch (error) {
        console.error("Error creating list:", error);
        throw error;
    }
}

const indexLists = async () => {
    try {
        const response = await axios.get("http://localhost:3004/lists/");
        const data = response.data
        return data;
    } catch (error) {
        console.log("Error fetching lists:", error);
    }
}

const updateLists= async (id, editDetails) => {
    try {
        const response = await axios.put(`http://localhost:3004/lists/${id}`,
            editDetails
        );
        return response.data;
    } catch (error) {
        console.log("Error updating list:", error);
    }
}

const deleteList = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lists?')) {
        return;
    }
    try {
        await axios.delete(`http://localhost:3004/lists/${id}`);
        console.log(`List with id ${id} deleted successfully.`);
        return true;
    } catch (error) {
        console.error("Error deleting list:", error)
        return false;
    }
}

export {
    createList,
    indexLists,
    updateLists,
    deleteList
};