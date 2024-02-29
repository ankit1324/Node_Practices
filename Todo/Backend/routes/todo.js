const { Router } = require("express");
const router = Router();

const {
  handleNewPostTodo,
  handleGetTodo,
  handleUpdateTodo,
  handleDeleteTodo,
} = require("../controller/todo");

//createTodo
router.post("/addNew", handleNewPostTodo);
//GetTodoS
router.get("/getTodo", handleGetTodo);
//updateTodo
router.put("/update/:id", handleUpdateTodo);
//DeleteTodo
router.delete("/delete/:id", handleDeleteTodo);

module.exports = router;
