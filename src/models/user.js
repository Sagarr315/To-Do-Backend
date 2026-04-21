const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    index: true   
  },
  user_fname: {
    type: String,
    required: true
  },
  user_lname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model("User", userSchema);