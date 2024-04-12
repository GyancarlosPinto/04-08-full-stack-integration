const express = require("express");
const listRouter = express.Router();
const listController = require("../Controllers/listController");

listRouter.get("/", listController.index);

listRouter.post("/", listController.create);

listRouter.get("/:id", listController.getById);

listRouter.put("/:id", listController.updateById);

listRouter.delete("/:id", listController.deleteById);

module.exports = listRouter
