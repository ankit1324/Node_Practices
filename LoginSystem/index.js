const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const formData = req.body;
  console.log("Form Data:", formData);

  // Return the received data as JSON response
  res.json(formData);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const body = req.body;
  const user1 = "Ankit@gmail.com";
  const user1Pass = "123";
  if (body.email === user1 && body.password === user1Pass) {
    res.render("success");
  } else {
    res.render("fail");
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
