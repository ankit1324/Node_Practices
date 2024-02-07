const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: false }));

//app.GET
app.get("/", (req, res) => {
  res.send("<h1>HomePage</h1>");
});

app.get("/users", (req, res) => {
  const html = `
    <ul>${users.map((user) => `<li> ${user.first_name}</li>`).join("")}</ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

//app.GET a user with id:
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(typeof id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

//app.POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "User created Successfull",
      id: users.length,
    });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.find((user) => user.id === id);
  console.log(index.id);
  users.splice(index.id, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "delete User",
    });
  });
});

app.listen(8000, () => {
  console.log("Server started at 8000");
});
