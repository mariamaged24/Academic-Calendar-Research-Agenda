const Task = require("../models/Task");
const User = require("../models/User");
const nodemailer = require("nodemailer");


createTask = (req, res) => {
    var reser = Task.create(req.body)
      .then((task) =>
        res.json({ msg: "Task added successfully", data: task._id })
      )
      .catch((err) => res.status(400).json({ error: err }));
  };



  module.exports = {
    createTask,
  };