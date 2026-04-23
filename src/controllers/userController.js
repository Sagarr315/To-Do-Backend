const User = require("../models/user");
const mongoose = require("mongoose");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single user (only self)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    //  prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    //  ownership check
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user (only self)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //  prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    //  ownership check
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};