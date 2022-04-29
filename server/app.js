const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();

const connectDB = require("./db.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./Routes/api/users");
const tasksRoutes = require("./Routes/api/tasks");

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/task", tasksRoutes);

const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));