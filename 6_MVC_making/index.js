const express = require("express");
const app = express();

const { connectMongoDB } = require("./connection");

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

//Connection
connectMongoDB("mongodb://0.0.0.0:27017/youtube-app").then(() =>
  console.log("MongoDB connected")
);

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
//Router
app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("Server started at 8000");
});
