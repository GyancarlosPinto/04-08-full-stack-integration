const express = require("express");
const taskRouter = express.Router();
const taskContoller = require("../Controllers/taskController");

taskRouter.get("/", taskContoller.index);

taskRouter.post("/", taskContoller.create);

taskRouter.get("/:id", taskContoller.getById);

taskRouter.put("/:id", taskContoller.updateById);

taskRouter.delete("/:id", taskContoller.deleteById);

module.exports = taskRouter