const Todo = require("../model/todo");

const handleNewPostTodo = async (req, res) => {
  const { title, task } = req.body;
  await Todo.create({
    title,
    task,
  });
  return res.status(201).json({
    msg: "Todo Created",
  });
};

const handleGetTodo = async (req, res) => {
  const todo = await Todo.find({});
  res.status(200).json({
    todo,
  });
};

const handleUpdateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, task } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, task });
    res.status(200).json({ "Updated Todo:": updatedTodo });
  } catch (error) {
    res.json({ "Error updating todo:": error });
  }
};

const handleDeleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.status(202).json({ "Deleted Todo:": deletedTodo });
  } catch (error) {
    res.json({ "Delete updating todo:": error });
  }
};

module.exports = {
  handleNewPostTodo,
  handleGetTodo,
  handleUpdateTodo,
  handleDeleteTodo,
};
