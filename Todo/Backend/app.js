//dotenv
require("dotenv").config();
//express
const express = require("express");
const app = express();
const todoRouter = require("./routes/todo");

//ConnectDB
const connectDb = require("./config/db");
connectDb(process.env.MONGO_URL);

//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("<h1>Homepage</h1>"));
app.use("/todo", todoRouter);

module.exports = app;
