const Task = require("../models/Task");
const User = require("../models/User");
const nodemailer = require("nodemailer");


createUser = (req, res) => {
    var reser = User.create(req.body)
      .then((user) =>
        res.json({ msg: "User added successfully", data: user._id })
      )
      .catch((err) => res.status(400).json({ error: err }));
  };

  
  module.exports = {
    createUser,
  };