const express = require("express");

const app = express();

// middleware
app.use(express.json());
// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.get("/", (req, res) => {
  res.send("Server running successfully");
});

module.exports = app;