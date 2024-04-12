const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter = require("./Routes/taskRoute");
const listRouter = require("./Routes/listRoute")

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRouter);
app.use("/lists", listRouter);

module.exports = app; 