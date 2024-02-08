const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();

//Connection
mongoose
  .connect("mongodb://0.0.0.0:27017/youtube-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("Mongo error", err);
  });

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model("user", userSchema);

//middleware
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.send("<h1>HonePage</h1>");
});

app.get("/users", async (req, res) => {
  const allDbUser = await User.find({});
  const html = `
  <ul>
  ${allDbUser
    .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
    .join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
});

app.post("/api/users", async (req, res) => {
  //create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "Success" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    //update user
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(202).json({ msg: "Deleted" });
  });

app.listen(8000, () => {
  console.log("Server started at 8000");
});
