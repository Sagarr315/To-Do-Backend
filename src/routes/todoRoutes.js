const express = require("express");
const router = express.Router();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoById);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;  