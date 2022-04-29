const express = require("express");
const router = express.Router();
const taskController = require("../../Controllers/TaskController");

router.post("/createtask", taskController.createTask);

module.exports = router;