const Todo = require("../models/todo");
const mongoose = require("mongoose");

// GET all todos (only for logged-in user)
exports.getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const todos = await Todo.find({ user_id: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET todo by id (only own)
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE todo
exports.createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      completed,
      user_id: req.user.id
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE todo (only own)
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE todo (only own)
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid todo ID" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await todo.deleteOne();

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};