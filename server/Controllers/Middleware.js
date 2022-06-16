const jwt = require("jsonwebtoken");
const User = require("../models/User");

verifyJwT = (req, res, next) => {
    const token = req.headers["x-access-token"].split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
          return res.json({
            isLoggedIn: false,
            message: "Failed To Authenticate",
          });
        req.user = {};
        req.user._id = decoded.id;
        next();
      });
    } else {
      res.json({ message: "Incorrect Token Given", isLoggedIn: false });
    }
  }

  module.exports = {
      verifyJwT,
    };