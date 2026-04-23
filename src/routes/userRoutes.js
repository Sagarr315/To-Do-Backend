const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  deleteUser
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// protect all routes
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;