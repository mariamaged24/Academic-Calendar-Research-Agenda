const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/UserController");

router.post("/createuser", userController.createUser);

module.exports = router;