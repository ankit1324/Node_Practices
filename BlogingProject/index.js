const express = require("express");
const path = require("path");
const app = express();

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const checkForAuthCookie = require("./middleware/auth");

const port = 3000;

//connectMongodb
mongoose
  .connect("mongodb://0.0.0.0:27017/Blogify")
  .then((e) => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
