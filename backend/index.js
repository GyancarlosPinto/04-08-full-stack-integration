const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter = require("./Routes/taskRoute");

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRouter)

module.exports = app; 