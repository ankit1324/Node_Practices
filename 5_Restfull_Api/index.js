const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.send("<h1>HonePage</h1>");
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li> ${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  //create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "User created Succesfully",
      id: users.length,
    });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //update user
    const id = Number(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateUser };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "User updated Successfully" });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete((req, res) => {
    //delete user
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "User deleted Successfully" });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });

app.listen(8000, () => {
  console.log("Server started at 8000");
});
