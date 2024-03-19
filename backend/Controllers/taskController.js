const express = require("express");
const app = express();
const pool = require("../Database/pool");

app.use(express.json());

const index = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

const create = async (req, res) => {
    const createdAt = new Date().toUTCString();
    const { title, description, status, dueDate } = req.body;
    const { rows } = await pool.query('INSERT INTO tasks(title, description, status, due_date, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, status, dueDate, createdAt])
    res.status(201).json(rows[0]);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).send('Task not found');
    res.json(rows[0]);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { rows } = await pool.query('UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *', [title, description, status, id]);
    if (rows.length === 0) return res.status(404).send('Task not found');
    res.json(rows[0]);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).send('Task not found');
    res.status(204).send();
}

module.exports = {
    index,
    create,
    getById,
    updateById,
    deleteById
}