const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    task: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Todo = new model("todo", todoSchema);

module.exports = Todo;
