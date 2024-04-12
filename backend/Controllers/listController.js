const express = require("express");
const app = express();
const pool = require("../Database/pool");

app.use(express.json());

const index = async (req, res) => {
    try {
        const { rows } = await pool.query(`
    SELECT lists.*, tasks.id as task_id, tasks.title as task_title, tasks.description as task_description
    FROM lists 
    LEFT JOIN tasks 
    ON lists.id = tasks.list_id
`);

        // Initialize an empty object to hold the lists with their tasks
        let listsWithTasks = {};

        // Process each row to organize tasks under their respective lists
        rows.forEach(row => {
            // If the list hasn't been added to listsWithTasks yet, add it
            if (!listsWithTasks[row.id]) {
                listsWithTasks[row.id] = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    tasks: []
                };
            }

            // Add the task to the list if it exists (it might not exist if the join found no matching tasks)
            if (row.task_id) {
                listsWithTasks[row.id].tasks.push({
                    id: row.task_id,
                    name: row.task_title,
                    description: row.task_description
                });
            }
        });

        // Convert the object back into an array of lists
        const result = Object.values(listsWithTasks);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const create = async (req, res) => {
    const createdAt = new Date().toUTCString();
    const { title } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO lists(title, created_at) VALUES ($1, $2) RETURNING *', [title, createdAt]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM lists WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).send('List not found');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const { rows } = await pool.query('UPDATE lists SET title = $1, WHERE id = $2 RETURNING *', [title, id]);
        if (rows.length === 0) return res.status(404).send('List not found');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query('DELETE FROM lists WHERE id = $1', [id]);
        if (rowCount === 0) return res.status(404).send('List not found');
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    index,
    create,
    getById,
    updateById,
    deleteById
}