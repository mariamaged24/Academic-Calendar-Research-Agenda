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
const questionsRoutes = require("./Routes/api/questions");
const researchesRoutes = require("./Routes/api/researches");
const reactionsRoutes = require("./Routes/api/reactions");

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/question", questionsRoutes);
app.use("/api/research", researchesRoutes);
app.use("/api/reaction", reactionsRoutes);

const port = process.env.SERVER_PORT;

app.set("view engine", "ejs");
app.listen(port, () => console.log(`Server running on port ${port}`));